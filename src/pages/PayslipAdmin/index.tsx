import React, { useState, useEffect } from "react";
import { PayslipContainer } from "./style";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

interface Employee {
    _id: string;
    firstName: string;
    email: string;
    designation: string;
    department: string;
    employeeCode: number;
    phone: string;
    status: number;
}

interface SalaryInfo {
    _id: string;
    employeeId: Employee;
    basicSalary: number;
    hra: number;
    medicalAllowance: number;
    otherAllowances: number;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    panNumber: string;
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const PayslipAdmin: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [salaries, setSalaries] = useState<SalaryInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [editingSalaryId, setEditingSalaryId] = useState<string | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [hra, setHra] = useState("");
    const [medicalAllowance, setMedicalAllowance] = useState("");
    const [otherAllowances, setOtherAllowances] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [panNumber, setPanNumber] = useState("");

    // ✅ NEW — Net/CTC auto-split state
    const [netSalary, setNetSalary] = useState("");
    const [autoSplit, setAutoSplit] = useState(false);

    // Payslip generator modal
    const [payslipModal, setPayslipModal] = useState(false);
    const [payslipSalary, setPayslipSalary] = useState<SalaryInfo | null>(null);
    const [payslipMonth, setPayslipMonth] = useState(currentMonth);
    const [payslipYear, setPayslipYear] = useState(currentYear);

    // Delete confirm
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees();
        fetchSalaries();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch(`${BASE_URL}/employees`);
            const result = await res.json();
            if (result.success) setEmployees(result.result?.users || []);
        } catch (err) { console.error(err); }
    };

    const fetchSalaries = async () => {
        try {
            const res = await fetch(`${BASE_URL}/salary`);
            const result = await res.json();
            if (result.success) setSalaries(result.result?.salaries || []);
        } catch (err) { console.error(err); }
    };

    const resetForm = () => {
        setSelectedEmployeeId(""); setBasicSalary(""); setHra("");
        setMedicalAllowance(""); setOtherAllowances(""); setBankName("");
        setAccountNumber(""); setIfscCode(""); setPanNumber("");
        setEditingSalaryId(null); setShowForm(false);
        setNetSalary(""); setAutoSplit(false); // ✅ reset new fields
    };

    // ✅ NEW — Auto-split CTC into salary components
    const handleNetSalaryChange = (value: string) => {
        setNetSalary(value);
        const net = parseFloat(value) || 0;
        if (net > 0) {
            const basic = Math.round(net * 0.40);           // 40% Basic
            const hraVal = Math.round(net * 0.20);          // 20% HRA
            const medical = Math.round(net * 0.06);         // 6% Medical
            const other = net - basic - hraVal - medical;   // Remainder ~34%
            setBasicSalary(String(basic));
            setHra(String(hraVal));
            setMedicalAllowance(String(medical));
            setOtherAllowances(String(Math.max(0, other)));
            setAutoSplit(true);
        } else {
            setBasicSalary(""); setHra("");
            setMedicalAllowance(""); setOtherAllowances("");
            setAutoSplit(false);
        }
    };

    const handleEdit = (s: SalaryInfo) => {
        setEditingSalaryId(s._id);
        setSelectedEmployeeId(s.employeeId._id);
        setBasicSalary(String(s.basicSalary));
        setHra(String(s.hra));
        setMedicalAllowance(String(s.medicalAllowance));
        setOtherAllowances(String(s.otherAllowances));
        setBankName(s.bankName);
        setAccountNumber(s.accountNumber);
        setIfscCode(s.ifscCode);
        setPanNumber(s.panNumber);
        // ✅ Pre-fill net salary from existing total
        const total = s.basicSalary + s.hra + s.medicalAllowance + s.otherAllowances;
        setNetSalary(String(total));
        setAutoSplit(false);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const body = {
                employeeId: selectedEmployeeId,
                basicSalary: parseFloat(basicSalary) || 0,
                hra: parseFloat(hra) || 0,
                medicalAllowance: parseFloat(medicalAllowance) || 0,
                otherAllowances: parseFloat(otherAllowances) || 0,
                bankName, accountNumber, ifscCode, panNumber,
            };

            const res = await fetch(`${BASE_URL}/salary`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const result = await res.json();

            if (result.success) {
                setMessage({ text: editingSalaryId ? "✅ Salary info updated!" : "✅ Salary info saved!", type: "success" });
                resetForm();
                fetchSalaries();
            } else {
                setMessage({ text: result.message || "Failed", type: "error" });
            }
        } catch {
            setMessage({ text: "Server error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${BASE_URL}/salary/${id}`, { method: "DELETE" });
            const result = await res.json();
            if (result.success) {
                setMessage({ text: "✅ Deleted successfully!", type: "success" });
                setDeleteConfirmId(null);
                fetchSalaries();
            }
        } catch { setMessage({ text: "Server error", type: "error" }); }
    };

    const getMonthOptions = () => {
        const options = [];
        for (let i = 0; i < 12; i++) {
            const d = new Date(currentYear, currentMonth - i, 1);
            options.push({ month: d.getMonth(), year: d.getFullYear(), label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}` });
        }
        return options;
    };

    // Generate PDF payslip — unchanged
    const generatePayslip = () => {
        if (!payslipSalary) return;

        const emp = payslipSalary.employeeId;
        const grossAmt = payslipSalary.basicSalary + payslipSalary.hra +
            payslipSalary.medicalAllowance + payslipSalary.otherAllowances;
        const netPay = grossAmt;
        const monthLabel = `${MONTHS[payslipMonth]} ${payslipYear}`;
        const daysInMonth = new Date(payslipYear, payslipMonth + 1, 0).getDate();
        const RS = "Rs.";
        const fmt = (n: number) => n.toLocaleString("en-IN");

        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pw = doc.internal.pageSize.getWidth();

        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, pw, 40, "F");
        doc.setFillColor(0, 123, 255);
        doc.rect(0, 40, pw, 2.5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(17);
        doc.setFont("helvetica", "bold");
        doc.text("SHINELOGICS INFOTECH", 14, 14);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(148, 163, 184);
        doc.text("www.shinelogics.com  |  hr@shinelogics.com", 14, 21);
        doc.text("Coimbatore, Tamil Nadu, India - 641 001", 14, 27);
        doc.setTextColor(0, 183, 255);
        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("PAYSLIP", pw - 14, 14, { align: "right" });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(148, 163, 184);
        doc.text(`Month: ${monthLabel}`, pw - 14, 21, { align: "right" });
        doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, pw - 14, 27, { align: "right" });

        doc.setFillColor(245, 247, 252);
        doc.roundedRect(14, 47, pw - 28, 34, 3, 3, "F");
        doc.setDrawColor(220, 225, 235);
        doc.setLineWidth(0.3);
        doc.roundedRect(14, 47, pw - 28, 34, 3, 3, "S");
        doc.setFillColor(0, 123, 255);
        doc.circle(24, 64, 7, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(emp.firstName.charAt(0).toUpperCase(), 24, 67.5, { align: "center" });
        doc.setTextColor(26, 26, 46);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(emp.firstName, 35, 58);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        doc.text(`${emp.designation || "—"}  |  ${emp.department || "—"}`, 35, 64);
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(8);
        doc.text(`Emp Code : #${emp.employeeCode || "—"}`, 35, 71);
        doc.text(`Email      : ${emp.email}`, 35, 76);
        const midX = pw / 2 + 12;
        doc.text(`Phone : ${emp.phone || "—"}`, midX, 71);
        doc.text(`PAN    : ${payslipSalary.panNumber || "—"}`, midX, 76);

        doc.setFillColor(15, 52, 96);
        doc.roundedRect(14, 85, pw - 28, 11, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.text(`Pay Period: ${monthLabel}`, 20, 92);
        const mid1 = pw / 2 - 5;
        doc.text(`Working Days: ${daysInMonth}`, mid1, 92, { align: "center" });
        doc.text(`Paid Days: ${daysInMonth}`, pw - 20, 92, { align: "right" });

        doc.setTextColor(26, 26, 46);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("EARNINGS", 14, 104);
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(0.8);
        doc.line(14, 105.5, 44, 105.5);

        const earningsBody: any[] = [
            ["Basic Salary", `${RS} ${fmt(payslipSalary.basicSalary)}`],
            ["House Rent Allowance (HRA)", `${RS} ${fmt(payslipSalary.hra)}`],
            ["Medical Allowance", `${RS} ${fmt(payslipSalary.medicalAllowance)}`],
        ];
        if (payslipSalary.otherAllowances > 0) {
            earningsBody.push(["Other Allowances", `${RS} ${fmt(payslipSalary.otherAllowances)}`]);
        }
        earningsBody.push([
            { content: "GROSS EARNINGS", styles: { fontStyle: "bold", fillColor: [240, 247, 255], textColor: [15, 52, 96] } },
            { content: `${RS} ${fmt(grossAmt)}`, styles: { fontStyle: "bold", fillColor: [240, 247, 255], textColor: [15, 52, 96], halign: "right" } }
        ]);

        autoTable(doc, {
            startY: 108,
            head: [["Component", "Amount"]],
            body: earningsBody,
            styles: { fontSize: 9, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, lineColor: [230, 232, 240], lineWidth: 0.2 },
            headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9, cellPadding: { top: 5, bottom: 5, left: 6, right: 6 } },
            alternateRowStyles: { fillColor: [250, 251, 254] },
            columnStyles: { 0: { cellWidth: "auto" }, 1: { halign: "right", cellWidth: 45 } },
            margin: { left: 14, right: 14 },
            tableLineColor: [220, 225, 235],
            tableLineWidth: 0.3,
        });

        const afterEarnings = (doc as any).lastAutoTable.finalY + 6;

        doc.setTextColor(26, 26, 46);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("DEDUCTIONS", 14, afterEarnings + 2);
        doc.setDrawColor(220, 38, 38);
        doc.setLineWidth(0.8);
        doc.line(14, afterEarnings + 3.5, 50, afterEarnings + 3.5);

        autoTable(doc, {
            startY: afterEarnings + 6,
            head: [["Component", "Amount"]],
            body: [[
                { content: "No Deductions Applicable", styles: { textColor: [100, 116, 139], fontStyle: "italic" } },
                { content: `${RS} 0`, styles: { halign: "right", textColor: [100, 116, 139] } }
            ]],
            styles: { fontSize: 9, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, lineColor: [230, 232, 240], lineWidth: 0.2 },
            headStyles: { fillColor: [180, 28, 28], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9, cellPadding: { top: 5, bottom: 5, left: 6, right: 6 } },
            columnStyles: { 0: { cellWidth: "auto" }, 1: { halign: "right", cellWidth: 45 } },
            margin: { left: 14, right: 14 },
            tableLineColor: [220, 225, 235],
            tableLineWidth: 0.3,
        });

        const afterDeductions = (doc as any).lastAutoTable.finalY + 6;

        doc.setFillColor(15, 52, 96);
        doc.roundedRect(14, afterDeductions, pw - 28, 16, 3, 3, "F");
        doc.setFillColor(0, 123, 255);
        doc.roundedRect(14, afterDeductions, 5, 16, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10.5);
        doc.setFont("helvetica", "bold");
        doc.text("NET PAY (Take Home)", 23, afterDeductions + 10);
        doc.setFontSize(12);
        doc.text(`${RS} ${fmt(netPay)}`, pw - 20, afterDeductions + 10, { align: "right" });
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 116, 139);
        doc.text(`In words: ${numberToWords(netPay)} Rupees Only`, 14, afterDeductions + 22);

        const bankY = afterDeductions + 28;
        doc.setFillColor(245, 247, 252);
        doc.roundedRect(14, bankY, pw - 28, 26, 3, 3, "F");
        doc.setDrawColor(220, 225, 235);
        doc.setLineWidth(0.3);
        doc.roundedRect(14, bankY, pw - 28, 26, 3, 3, "S");
        doc.setFillColor(0, 123, 255);
        doc.roundedRect(14, bankY, 4, 26, 2, 2, "F");
        doc.setTextColor(26, 26, 46);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("BANK DETAILS", 22, bankY + 8);
        doc.setFontSize(8.2);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        doc.text("Bank Name", 22, bankY + 15);
        doc.setFont("helvetica", "bold");
        doc.text(`: ${payslipSalary.bankName || "—"}`, 50, bankY + 15);
        doc.setFont("helvetica", "normal");
        doc.text("Account No", 22, bankY + 21);
        doc.setFont("helvetica", "bold");
        doc.text(`: ${payslipSalary.accountNumber || "—"}`, 50, bankY + 21);
        doc.setFont("helvetica", "normal");
        doc.text("IFSC Code", midX, bankY + 15);
        doc.setFont("helvetica", "bold");
        doc.text(`: ${payslipSalary.ifscCode || "—"}`, midX + 26, bankY + 15);
        doc.setFont("helvetica", "normal");
        doc.text("PAN No", midX, bankY + 21);
        doc.setFont("helvetica", "bold");
        doc.text(`: ${payslipSalary.panNumber || "—"}`, midX + 26, bankY + 21);

        const sigY = bankY + 34;
        doc.setDrawColor(200, 210, 220);
        doc.setLineWidth(0.4);
        doc.line(14, sigY + 12, 70, sigY + 12);
        doc.line(pw - 70, sigY + 12, pw - 14, sigY + 12);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        doc.text("Employee Signature", 42, sigY + 17, { align: "center" });
        doc.text("Authorized Signatory", pw - 42, sigY + 17, { align: "center" });

        const footerY = sigY + 24;
        doc.setFillColor(26, 26, 46);
        doc.rect(0, footerY, pw, 18, "F");
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "italic");
        doc.text("This is a system-generated payslip and does not require a physical signature.", pw / 2, footerY + 7, { align: "center" });
        doc.text("For queries, contact HR: hr@shinelogics.com  |  Shinelogics Infotech, Coimbatore", pw / 2, footerY + 13, { align: "center" });

        doc.save(`Payslip_${emp.firstName}_${monthLabel.replace(" ", "_")}.pdf`);
        setPayslipModal(false);
    };

    const numberToWords = (num: number): string => {
        if (num === 0) return "Zero";
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const convert = (n: number): string => {
            if (n < 20) return ones[n];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
            if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
            if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
            if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
            return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
        };
        return convert(Math.floor(num));
    };

    const gross = (s: SalaryInfo) =>
        s.basicSalary + s.hra + s.medicalAllowance + s.otherAllowances;

    const employeesWithSalary = salaries.map(s => s.employeeId._id);
    const availableEmployees = employees.filter(e => !employeesWithSalary.includes(e._id) || editingSalaryId);

    return (
        <PayslipContainer>
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h1>💰 Payslip Management</h1>
                    <p>Manage employee salary info and generate payslips</p>
                </div>
                <button className="add-btn" onClick={() => { resetForm(); setShowForm(!showForm); }}>
                    {showForm ? "✕ Cancel" : "+ Add Salary Info"}
                </button>
            </div>

            {message.text && (
                <p className={message.type === "success" ? "success-msg" : "error-msg"}>{message.text}</p>
            )}

            {/* SALARY FORM */}
            {showForm && (
                <div className="form-card">
                    <h2>{editingSalaryId ? "Edit Salary Info" : "Add Salary Info"}</h2>
                    <p className="subtitle">Enter CTC to auto-split, or fill components manually</p>

                    <form onSubmit={handleSubmit} autoComplete="off">

                        {/* Employee selector — only for new */}
                        {!editingSalaryId && (
                            <div className="form-section">
                                <h3>Select Employee</h3>
                                <div className="form-grid-1">
                                    <div className="input-group">
                                        <label>Employee <span className="required">*</span></label>
                                        <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} required>
                                            <option value="">-- Select Employee --</option>
                                            {availableEmployees.map(emp => (
                                                <option key={emp._id} value={emp._id}>
                                                    #{emp.employeeCode} — {emp.firstName} ({emp.designation || "—"})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ✅ NEW — CTC / Net Salary Auto-Split */}
                        <div className="form-section">
                            <h3>CTC / Net Salary Auto-Split</h3>
                            <div className="net-salary-bar">
                                <div className="input-group">
                                    <label>Enter Total CTC / Net Salary (₹) — Auto fills components below</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="e.g. 50000 — will auto-fill Basic, HRA, Medical, Other"
                                        value={netSalary}
                                        onChange={(e) => handleNetSalaryChange(e.target.value)}
                                    />
                                </div>
                                {autoSplit && netSalary && (
                                    <div className="split-badge">
                                        ✅ Auto-split applied (40% Basic · 20% HRA · 6% Medical · remainder Other) — edit below if needed
                                    </div>
                                )}
                                <div className="split-formula">
                                    <span>📐 Formula:</span>
                                    <span className="formula-chip basic">Basic = 40%</span>
                                    <span className="formula-chip hra">HRA = 20%</span>
                                    <span className="formula-chip medical">Medical = 6%</span>
                                    <span className="formula-chip other">Other = 34%</span>
                                </div>
                            </div>
                        </div>

                        {/* Salary Components */}
                        <div className="form-section">
                            <h3>Salary Components (Monthly)</h3>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Basic Salary (₹) — 40% <span className="required">*</span></label>
                                    <input
                                        type="number" min="0" placeholder="e.g. 20000"
                                        value={basicSalary}
                                        onChange={(e) => { setBasicSalary(e.target.value); setAutoSplit(false); }}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>HRA (₹) — 20%</label>
                                    <input
                                        type="number" min="0" placeholder="e.g. 10000"
                                        value={hra}
                                        onChange={(e) => { setHra(e.target.value); setAutoSplit(false); }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Medical Allowance (₹) — 6%</label>
                                    <input
                                        type="number" min="0" placeholder="e.g. 3000"
                                        value={medicalAllowance}
                                        onChange={(e) => { setMedicalAllowance(e.target.value); setAutoSplit(false); }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Other Allowances (₹) — ~34%</label>
                                    <input
                                        type="number" min="0" placeholder="e.g. 17000"
                                        value={otherAllowances}
                                        onChange={(e) => { setOtherAllowances(e.target.value); setAutoSplit(false); }}
                                    />
                                </div>
                            </div>
                            {basicSalary && (
                                <div className="gross-preview">
                                    Gross Salary: <strong>₹ {(
                                        (parseFloat(basicSalary) || 0) +
                                        (parseFloat(hra) || 0) +
                                        (parseFloat(medicalAllowance) || 0) +
                                        (parseFloat(otherAllowances) || 0)
                                    ).toLocaleString("en-IN")}</strong> / month
                                    {netSalary && (
                                        <span className="net-match">
                                            {" "}· CTC entered: ₹ {parseFloat(netSalary).toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bank Details */}
                        <div className="form-section">
                            <h3>Bank & Other Details</h3>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Bank Name</label>
                                    <input type="text" placeholder="e.g. HDFC Bank"
                                        value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Account Number</label>
                                    <input type="text" placeholder="e.g. 1234567890"
                                        value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>IFSC Code</label>
                                    <input type="text" placeholder="e.g. HDFC0001234"
                                        value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>PAN Number</label>
                                    <input type="text" placeholder="e.g. ABCDE1234F"
                                        value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? "Saving..." : editingSalaryId ? "Update Salary Info" : "Save Salary Info"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* SALARY TABLE */}
            <div className="table-card">
                <h3>Employee Salary Records ({salaries.length})</h3>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Employee</th>
                                <th>Designation</th>
                                <th>Basic (₹)</th>
                                <th>HRA (₹)</th>
                                <th>Medical (₹)</th>
                                <th>Other (₹)</th>
                                <th>Gross (₹)</th>
                                <th>Bank</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.length === 0 ? (
                                <tr><td colSpan={10} className="empty-row">No salary records found</td></tr>
                            ) : (
                                salaries.map((s, i) => (
                                    <tr key={s._id}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="emp-cell">
                                                <span className="emp-name">{s.employeeId?.firstName}</span>
                                                <span className="emp-code">#{s.employeeId?.employeeCode}</span>
                                            </div>
                                        </td>
                                        <td>{s.employeeId?.designation || "—"}</td>
                                        <td>₹ {s.basicSalary.toLocaleString("en-IN")}</td>
                                        <td>₹ {s.hra.toLocaleString("en-IN")}</td>
                                        <td>₹ {s.medicalAllowance.toLocaleString("en-IN")}</td>
                                        <td>₹ {s.otherAllowances.toLocaleString("en-IN")}</td>
                                        <td className="gross-cell">₹ {gross(s).toLocaleString("en-IN")}</td>
                                        <td>{s.bankName || "—"}</td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="action-btn edit" onClick={() => handleEdit(s)} title="Edit">✏️</button>
                                                <button className="action-btn generate" title="Generate Payslip"
                                                    onClick={() => { setPayslipSalary(s); setPayslipModal(true); }}>
                                                    📄
                                                </button>
                                                {deleteConfirmId === s._id ? (
                                                    <div className="confirm-delete">
                                                        <span>Sure?</span>
                                                        <button className="confirm-yes" onClick={() => handleDelete(s._id)}>Yes</button>
                                                        <button className="confirm-no" onClick={() => setDeleteConfirmId(null)}>No</button>
                                                    </div>
                                                ) : (
                                                    <button className="action-btn delete" onClick={() => setDeleteConfirmId(s._id)} title="Delete">🗑️</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAYSLIP GENERATOR MODAL — unchanged */}
            {payslipModal && payslipSalary && (
                <div className="modal-overlay" onClick={() => setPayslipModal(false)}>
                    <div className="payslip-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">
                                <span className="modal-avatar">{payslipSalary.employeeId.firstName.charAt(0)}</span>
                                <div>
                                    <h3>Generate Payslip</h3>
                                    <p>{payslipSalary.employeeId.firstName} — {payslipSalary.employeeId.designation || "—"}</p>
                                </div>
                            </div>
                            <button className="modal-close" onClick={() => setPayslipModal(false)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-subtitle">Select the month and year for the payslip</p>

                            <div className="quick-select">
                                <p className="qs-label">Quick Select</p>
                                <div className="qs-options">
                                    {getMonthOptions().slice(0, 6).map((opt, i) => (
                                        <button
                                            key={i}
                                            className={`qs-btn ${payslipMonth === opt.month && payslipYear === opt.year ? "active" : ""}`}
                                            onClick={() => { setPayslipMonth(opt.month); setPayslipYear(opt.year); }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="manual-select">
                                <div className="input-group">
                                    <label>Month</label>
                                    <select value={payslipMonth} onChange={(e) => setPayslipMonth(parseInt(e.target.value))}>
                                        {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Year</label>
                                    <select value={payslipYear} onChange={(e) => setPayslipYear(parseInt(e.target.value))}>
                                        {[currentYear, currentYear - 1, currentYear - 2].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="salary-preview">
                                <div className="sp-row">
                                    <span>Basic Salary</span>
                                    <span>₹ {payslipSalary.basicSalary.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="sp-row">
                                    <span>HRA</span>
                                    <span>₹ {payslipSalary.hra.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="sp-row">
                                    <span>Medical Allowance</span>
                                    <span>₹ {payslipSalary.medicalAllowance.toLocaleString("en-IN")}</span>
                                </div>
                                {payslipSalary.otherAllowances > 0 && (
                                    <div className="sp-row">
                                        <span>Other Allowances</span>
                                        <span>₹ {payslipSalary.otherAllowances.toLocaleString("en-IN")}</span>
                                    </div>
                                )}
                                <div className="sp-row deductions">
                                    <span>Deductions</span>
                                    <span>₹ 0</span>
                                </div>
                                <div className="sp-row net">
                                    <span>NET PAY</span>
                                    <span>₹ {gross(payslipSalary).toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            <button className="generate-btn" onClick={generatePayslip}>
                                📥 Download Payslip PDF — {MONTHS[payslipMonth]} {payslipYear}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PayslipContainer>
    );
};

export default PayslipAdmin;