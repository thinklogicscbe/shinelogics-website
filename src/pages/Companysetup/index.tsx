// pages/Companysetup/index.tsx
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import axios from 'axios';

// ─── Theme (White / Light) ───────────────────────────────────────────────────
const theme = {
  bg:          '#f5f7fa',
  surface:     '#ffffff',
  surfaceHigh: '#f8fafc',
  surfaceMid:  '#f1f5f9',
  border:      '#e2e8f0',
  borderLight: '#cbd5e1',
  accent:      '#2563eb',
  accentDim:   'rgba(37,99,235,0.08)',
  accentGlow:  'rgba(37,99,235,0.18)',
  accentDeep:  '#1d4ed8',
  success:     '#059669',
  successDim:  'rgba(5,150,105,0.08)',
  warning:     '#d97706',
  warningDim:  'rgba(217,119,6,0.08)',
  error:       '#dc2626',
  errorDim:    'rgba(220,38,38,0.08)',
  text:        '#0f172a',
  textMuted:   '#64748b',
  label:       '#475569',
};

// ─── Constants ───────────────────────────────────────────────────────────────
const DAYS       = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const;
const INDUSTRIES = ['Technology','Finance','Healthcare','Education','Retail','Manufacturing','Consulting','Media','Real Estate','Other'];
const TIMEZONES  = ['Asia/Kolkata','Asia/Dubai','Asia/Singapore','Europe/London','Europe/Berlin','America/New_York','America/Chicago','America/Los_Angeles','Australia/Sydney','UTC'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  companyName: string; companyCode: string; industry: string; companyLogo: File | null; companyLogoPreview: string;
  street: string; city: string; state: string; country: string; zipCode: string;
  email: string; phone: string; website: string;
  timeZone: string; workStart: string; workEnd: string; workDays: string[];
}
interface ToastState  { msg: string; type: 'success' | 'error' | 'warning'; }
interface CompanyDoc  {
  _id: string; companyName: string; companyCode: string; industry: string; companyLogo: string;
  companyAddress: { street?: string; city?: string; state?: string; country?: string; zipCode?: string };
  contactDetails: { email?: string; phone?: string; website?: string };
  timeZone: string; workingHours: { start?: string; end?: string; days?: string[] };
  createdAt?: string;
}
type ModalMode = 'create' | 'edit' | 'view' | 'delete' | null;

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp  = keyframes`from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}`;
const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const scaleIn = keyframes`from{opacity:0;transform:scale(0.96) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}`;
const spin    = keyframes`to{transform:rotate(360deg)}`;
const shimmer = keyframes`0%{background-position:-600px 0}100%{background-position:600px 0}`;

// ─── Global ───────────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:${theme.bg};color:${theme.text};font-family:'Plus Jakarta Sans',sans-serif}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:${theme.surfaceHigh}}
  ::-webkit-scrollbar-thumb{background:${theme.borderLight};border-radius:3px}
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  min-height:100vh;
  background:${theme.bg};
  padding:32px 28px 80px;
`;

const TopBar = styled.div`
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:28px;
  animation:${fadeUp} 0.35s ease both;
`;

const TitleBlock = styled.div``;
const PageTitle = styled.h1`
  font-size:1.6rem;font-weight:800;color:${theme.text};letter-spacing:-0.5px;
  span{color:${theme.accent}}
`;
const PageSub = styled.p`color:${theme.textMuted};font-size:0.82rem;margin-top:3px`;

// ─── Stats ────────────────────────────────────────────────────────────────────
const StatsRow = styled.div`
  display:flex;gap:14px;margin-bottom:24px;flex-wrap:wrap;
  animation:${fadeUp} 0.35s ease 0.05s both;
`;
interface StatCardProps { $color: string; }
const StatCard = styled.div<StatCardProps>`
  flex:1;min-width:130px;
  background:${theme.surface};
  border:1px solid ${theme.border};
  border-radius:12px;padding:16px 18px;
  position:relative;overflow:hidden;
  box-shadow:0 1px 3px rgba(0,0,0,0.06);
  &::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:${p=>p.$color}}
`;
const StatNum   = styled.div<{$color:string}>`font-size:1.7rem;font-weight:800;color:${p=>p.$color};line-height:1`;
const StatLabel = styled.div`font-size:0.75rem;color:${theme.textMuted};margin-top:5px;font-weight:600;letter-spacing:0.3px`;

// ─── Create Button ────────────────────────────────────────────────────────────
const CreateBtn = styled.button`
  display:flex;align-items:center;gap:8px;
  padding:10px 20px;
  background:${theme.accent};color:#fff;
  border:none;border-radius:9px;
  font-family:'Plus Jakarta Sans',sans-serif;font-size:0.875rem;font-weight:700;
  cursor:pointer;transition:all 0.18s;
  box-shadow:0 2px 8px rgba(37,99,235,0.3);
  &:hover{background:${theme.accentDeep};transform:translateY(-1px);box-shadow:0 4px 16px rgba(37,99,235,0.35)}
`;

// ─── Table ────────────────────────────────────────────────────────────────────
const TableWrap = styled.div`
  background:${theme.surface};
  border:1px solid ${theme.border};
  border-radius:14px;overflow:hidden;
  box-shadow:0 1px 4px rgba(0,0,0,0.06);
  animation:${fadeUp} 0.35s ease 0.1s both;
`;
const TableHeader = styled.div`
  padding:16px 22px;border-bottom:1px solid ${theme.border};
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  background:${theme.surface};
`;
const TableTitle = styled.h3`font-size:0.875rem;font-weight:700;color:${theme.text}`;
const SearchBox = styled.input`
  background:${theme.surfaceHigh};border:1px solid ${theme.border};border-radius:8px;
  padding:7px 13px;font-size:0.82rem;font-family:'Plus Jakarta Sans',sans-serif;
  color:${theme.text};outline:none;width:220px;
  transition:border-color 0.18s,box-shadow 0.18s;
  &::placeholder{color:${theme.textMuted}}
  &:focus{border-color:${theme.accent};box-shadow:0 0 0 3px ${theme.accentDim}}
`;
const Table = styled.table`width:100%;border-collapse:collapse`;
const Th = styled.th`
  padding:10px 18px;text-align:left;font-size:0.7rem;font-weight:700;
  color:${theme.textMuted};letter-spacing:0.7px;text-transform:uppercase;
  background:${theme.surfaceHigh};border-bottom:1px solid ${theme.border};white-space:nowrap;
`;
interface TrProps { $index: number; }
const Tr = styled.tr<TrProps>`
  border-bottom:1px solid ${theme.border};
  background:${p => p.$index % 2 === 0 ? theme.surface : theme.surfaceHigh};
  transition:background 0.14s;
  animation:${fadeIn} 0.3s ease both;
  animation-delay:${p => p.$index * 0.04}s;
  &:last-child{border-bottom:none}
  &:hover{background:${theme.accentDim}}
`;
const Td = styled.td`padding:12px 18px;font-size:0.845rem;color:${theme.text};vertical-align:middle`;

const CodeBadge = styled.span`
  font-family:'JetBrains Mono',monospace;font-size:0.72rem;
  padding:3px 8px;background:${theme.accentDim};
  border:1px solid ${theme.accent}33;color:${theme.accent};border-radius:5px;font-weight:500;
`;
interface IndustryBadgeProps { $industry: string; }
const industryColor = (ind: string) => {
  const map: Record<string,string> = {
    Technology:'#2563eb', Finance:'#059669', Healthcare:'#7c3aed',
    Education:'#d97706', Retail:'#e11d48', Manufacturing:'#475569',
    Consulting:'#0891b2', Media:'#db2777', 'Real Estate':'#65a30d', Other:'#64748b',
  };
  return map[ind] || '#64748b';
};
const IndustryBadge = styled.span<IndustryBadgeProps>`
  font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:20px;
  background:${p => industryColor(p.$industry)}12;
  border:1px solid ${p => industryColor(p.$industry)}33;
  color:${p => industryColor(p.$industry)};
`;
const TzText = styled.span`font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:${theme.textMuted}`;

// ─── Action Buttons ───────────────────────────────────────────────────────────
const ActionGroup = styled.div`display:flex;gap:5px;align-items:center`;
interface ActionBtnProps { $variant: 'view' | 'edit' | 'delete'; }
const ActionBtn = styled.button<ActionBtnProps>`
  width:30px;height:30px;border-radius:7px;border:1px solid;
  cursor:pointer;font-size:0.78rem;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.14s;
  ${p => p.$variant === 'view'   && css`background:${theme.accentDim};border-color:${theme.accent}33;color:${theme.accent};&:hover{background:${theme.accent};color:#fff}`}
  ${p => p.$variant === 'edit'   && css`background:${theme.successDim};border-color:${theme.success}33;color:${theme.success};&:hover{background:${theme.success};color:#fff}`}
  ${p => p.$variant === 'delete' && css`background:${theme.errorDim};border-color:${theme.error}33;color:${theme.error};&:hover{background:${theme.error};color:#fff}`}
`;

// ─── Empty / Skeleton ─────────────────────────────────────────────────────────
const EmptyState = styled.div`padding:60px 24px;text-align:center`;
const EmptyIcon  = styled.div`font-size:2.8rem;margin-bottom:12px;opacity:0.35`;
const EmptyText  = styled.p`color:${theme.textMuted};font-size:0.875rem`;
const SkeletonRow = styled.div`
  height:52px;border-bottom:1px solid ${theme.border};
  background:linear-gradient(90deg,${theme.surfaceHigh} 25%,${theme.surfaceMid} 50%,${theme.surfaceHigh} 75%);
  background-size:800px 100%;animation:${shimmer} 1.4s infinite;
`;

// ─── Modal ────────────────────────────────────────────────────────────────────
const Overlay = styled.div`
  position:fixed;inset:0;background:rgba(15,23,42,0.45);
  backdrop-filter:blur(4px);z-index:999;
  display:flex;align-items:center;justify-content:center;padding:20px;
  animation:${fadeIn} 0.2s ease;
`;
const Modal = styled.div`
  background:${theme.surface};border:1px solid ${theme.border};border-radius:16px;
  width:100%;max-width:720px;max-height:90vh;overflow-y:auto;
  animation:${scaleIn} 0.22s ease;
  box-shadow:0 20px 60px rgba(0,0,0,0.15),0 0 0 1px ${theme.border};
`;
const ModalHead = styled.div`
  padding:18px 24px 14px;border-bottom:1px solid ${theme.border};
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;background:${theme.surface};z-index:1;
`;
const ModalTitle = styled.h2`
  font-size:0.975rem;font-weight:700;color:${theme.text};
  display:flex;align-items:center;gap:8px;
`;
const CloseBtn = styled.button`
  width:28px;height:28px;border-radius:7px;
  background:${theme.surfaceHigh};border:1px solid ${theme.border};
  color:${theme.textMuted};cursor:pointer;font-size:0.95rem;
  display:flex;align-items:center;justify-content:center;transition:all 0.14s;
  &:hover{background:${theme.errorDim};border-color:${theme.error}44;color:${theme.error}}
`;
const ModalBody = styled.div`padding:22px 24px`;

// ─── Form ─────────────────────────────────────────────────────────────────────
interface SectionTitleProps { $color?: string; }
const SectionTitle = styled.h3<SectionTitleProps>`
  font-size:0.72rem;font-weight:700;
  color:${p => p.$color || theme.accent};
  letter-spacing:0.9px;text-transform:uppercase;
  margin-bottom:12px;margin-top:20px;
  display:flex;align-items:center;gap:8px;
  &:first-child{margin-top:0}
  &::after{content:'';flex:1;height:1px;background:${p=>p.$color||theme.accent}22}
`;
interface GridProps { $cols?: string; }
const Grid = styled.div<GridProps>`
  display:grid;grid-template-columns:${p=>p.$cols||'repeat(2,1fr)'};gap:13px;
  @media(max-width:560px){grid-template-columns:1fr}
`;
interface FieldGroupProps { $full?: boolean; }
const FieldGroup = styled.div<FieldGroupProps>`
  display:flex;flex-direction:column;gap:5px;
  ${p=>p.$full && css`grid-column:1/-1`}
`;
const Label    = styled.label`font-size:0.71rem;font-weight:700;color:${theme.label};letter-spacing:0.5px;text-transform:uppercase`;
const Required = styled.span`color:${theme.error};margin-left:2px`;
const inputStyles = css`
  width:100%;background:${theme.surface};border:1.5px solid ${theme.border};border-radius:8px;
  padding:9px 12px;font-size:0.85rem;font-family:'Plus Jakarta Sans',sans-serif;
  color:${theme.text};outline:none;transition:border-color 0.18s,box-shadow 0.18s;
  &::placeholder{color:${theme.textMuted}}
  &:focus{border-color:${theme.accent};box-shadow:0 0 0 3px ${theme.accentDim}}
  &:disabled{opacity:0.55;cursor:not-allowed;background:${theme.surfaceHigh}}
`;
const StyledInput  = styled.input`${inputStyles}`;
const StyledSelect = styled.select`${inputStyles}cursor:pointer;option{background:${theme.surface}}`;
const ErrorMsg     = styled.span`font-size:0.71rem;color:${theme.error};font-weight:500`;

// Logo Upload
interface LogoAreaProps { $hasLogo: boolean; }
const LogoArea = styled.label<LogoAreaProps>`
  grid-column:1/-1;display:flex;align-items:center;gap:14px;
  padding:14px 16px;background:${theme.surfaceHigh};
  border:2px dashed ${p=>p.$hasLogo?theme.accent:theme.border};border-radius:10px;
  cursor:pointer;transition:border-color 0.18s,background 0.18s;
  &:hover{border-color:${theme.accent};background:${theme.accentDim}}
`;
const LogoPreview = styled.div`
  width:52px;height:52px;border-radius:9px;background:${theme.surface};
  border:1px solid ${theme.border};
  display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;
  img{width:100%;height:100%;object-fit:contain}
`;
const LogoMeta  = styled.div`flex:1`;
const LogoLabel = styled.p`font-weight:700;color:${theme.text};font-size:0.84rem`;
const LogoHint  = styled.p`color:${theme.textMuted};font-size:0.75rem;margin-top:2px`;

// Days
const DaysRow = styled.div`display:flex;flex-wrap:wrap;gap:6px;margin-top:2px`;
interface DayChipProps { $active: boolean }
const DayChip = styled.button<DayChipProps>`
  padding:4px 11px;border-radius:6px;font-size:0.76rem;font-weight:700;
  font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;
  border:1.5px solid ${p=>p.$active?theme.accent:theme.border};
  background:${p=>p.$active?theme.accentDim:theme.surface};
  color:${p=>p.$active?theme.accent:theme.textMuted};
  transition:all 0.14s;
  &:hover{border-color:${theme.accent};color:${theme.accent}}
`;

// Modal Footer
const ModalFoot = styled.div`
  padding:14px 24px;border-top:1px solid ${theme.border};
  display:flex;justify-content:flex-end;gap:10px;
  position:sticky;bottom:0;background:${theme.surface};
`;
const Btn = styled.button`
  padding:9px 20px;border-radius:8px;
  font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;font-weight:700;
  cursor:pointer;border:none;display:flex;align-items:center;gap:7px;
  transition:all 0.18s;&:disabled{opacity:0.45;cursor:not-allowed}
`;
const PrimaryBtn   = styled(Btn)`background:${theme.accent};color:#fff;&:hover:not(:disabled){background:${theme.accentDeep};transform:translateY(-1px)}`;
const SecondaryBtn = styled(Btn)`background:${theme.surfaceHigh};color:${theme.text};border:1.5px solid ${theme.border};&:hover:not(:disabled){border-color:${theme.accent};color:${theme.accent}}`;
const DangerBtn    = styled(Btn)`background:${theme.errorDim};color:${theme.error};border:1.5px solid ${theme.error}33;&:hover:not(:disabled){background:${theme.error};color:#fff}`;
const Spinner      = styled.div`width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:${spin} 0.6s linear infinite`;

// View Detail
const DetailGrid  = styled.div`display:grid;grid-template-columns:repeat(2,1fr);gap:10px;@media(max-width:480px){grid-template-columns:1fr}`;
const DetailItem  = styled.div`background:${theme.surfaceHigh};border:1px solid ${theme.border};border-radius:9px;padding:11px 13px`;
const DetailLabel = styled.p`font-size:0.67rem;color:${theme.textMuted};text-transform:uppercase;letter-spacing:0.6px;font-weight:700;margin-bottom:4px`;
const DetailVal   = styled.p`font-size:0.845rem;color:${theme.text};font-weight:500;word-break:break-all`;

// Delete confirm
const DeleteConfirmBox = styled.div`background:${theme.errorDim};border:1px solid ${theme.error}33;border-radius:10px;padding:24px;text-align:center`;
const DeleteIcon = styled.div`font-size:2.4rem;margin-bottom:10px`;
const DeleteText = styled.p`color:${theme.text};font-size:0.9rem;font-weight:600;margin-bottom:4px`;
const DeleteSub  = styled.p`color:${theme.textMuted};font-size:0.8rem`;

// Toast
interface ToastBoxProps { $type: 'success' | 'error' | 'warning'; }
const toastColor = (t: string) => t==='success'?theme.success:t==='error'?theme.error:theme.warning;
const toastBg    = (t: string) => t==='success'?theme.successDim:t==='error'?theme.errorDim:theme.warningDim;
const ToastBox = styled.div<ToastBoxProps>`
  position:fixed;bottom:24px;right:24px;padding:12px 18px;border-radius:10px;
  font-size:0.84rem;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;
  background:${p=>toastBg(p.$type)};border:1.5px solid ${p=>toastColor(p.$type)}44;
  color:${p=>toastColor(p.$type)};animation:${fadeUp} 0.25s ease;
  z-index:9999;display:flex;align-items:center;gap:8px;
  box-shadow:0 4px 20px rgba(0,0,0,0.1);
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initialForm: FormState = {
  companyName:'', companyCode:'', industry:'', companyLogo:null, companyLogoPreview:'',
  street:'', city:'', state:'', country:'', zipCode:'',
  email:'', phone:'', website:'',
  timeZone:'Asia/Kolkata', workStart:'09:00', workEnd:'18:00',
  workDays:['Mon','Tue','Wed','Thu','Fri'],
};

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

const docToForm = (c: CompanyDoc): FormState => ({
  companyName: c.companyName ?? '', companyCode: c.companyCode ?? '',
  industry: c.industry ?? '', companyLogo: null, companyLogoPreview: c.companyLogo ?? '',
  street: c.companyAddress?.street ?? '', city: c.companyAddress?.city ?? '',
  state: c.companyAddress?.state ?? '', country: c.companyAddress?.country ?? '',
  zipCode: c.companyAddress?.zipCode ?? '', email: c.contactDetails?.email ?? '',
  phone: c.contactDetails?.phone ?? '', website: c.contactDetails?.website ?? '',
  timeZone: c.timeZone ?? 'Asia/Kolkata',
  workStart: c.workingHours?.start ?? '09:00', workEnd: c.workingHours?.end ?? '18:00',
  workDays: c.workingHours?.days ?? ['Mon','Tue','Wed','Thu','Fri'],
});

// ─── Component ────────────────────────────────────────────────────────────────
const CompanySetup: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyDoc[]>([]);
  const [filtered,  setFiltered]  = useState<CompanyDoc[]>([]);
  const [search,    setSearch]    = useState('');
  const [fetching,  setFetching]  = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected,  setSelected]  = useState<CompanyDoc | null>(null);
  const [form,      setForm]      = useState<FormState>(initialForm);
  const [errors,    setErrors]    = useState<Partial<Record<keyof FormState,string>>>({});
  const [loading,   setLoading]   = useState(false);
  const [toast,     setToast]     = useState<ToastState | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string, type: ToastState['type'] = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const loadCompanies = useCallback(async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(`${API_BASE}/company`);
      const list: CompanyDoc[] = data?.result?.companies ?? [];
      setCompanies(list);
      setFiltered(list);
    } catch { showToast('Failed to load companies', 'error'); }
    finally { setFetching(false); }
  }, [showToast]);

  useEffect(() => { loadCompanies(); }, [loadCompanies]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(companies.filter(c =>
      c.companyName.toLowerCase().includes(q) ||
      c.companyCode.toLowerCase().includes(q)  ||
      c.industry.toLowerCase().includes(q)
    ));
  }, [search, companies]);

  const openCreate = () => { setForm(initialForm); setErrors({}); setSelected(null); setModalMode('create'); };
  const openEdit   = (c: CompanyDoc) => { setForm(docToForm(c)); setErrors({}); setSelected(c); setModalMode('edit'); };
  const openView   = (c: CompanyDoc) => { setSelected(c); setModalMode('view'); };
  const openDelete = (c: CompanyDoc) => { setSelected(c); setModalMode('delete'); };
  const closeModal = () => { setModalMode(null); setSelected(null); };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const toggleDay = (day: string) =>
    setForm(p => ({
      ...p,
      workDays: p.workDays.includes(day) ? p.workDays.filter(d => d !== day) : [...p.workDays, day],
    }));

  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm(p => ({ ...p, companyLogo: file, companyLogoPreview: preview }));
  };

  const validate = (): boolean => {
    const err: Partial<Record<keyof FormState,string>> = {};
    if (!form.companyName.trim()) err.companyName = 'Required';
    if (!form.companyCode.trim()) err.companyCode = 'Required';
    if (!form.industry)           err.industry    = 'Required';
    setErrors(err);
    return !Object.keys(err).length;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // Build multipart form data to support file upload
      const payload = new FormData();
      payload.append('companyName',  form.companyName);
      payload.append('companyCode',  form.companyCode);
      payload.append('industry',     form.industry);
      payload.append('timeZone',     form.timeZone);
      payload.append('companyAddress', JSON.stringify({
        street: form.street, city: form.city, state: form.state,
        country: form.country, zipCode: form.zipCode,
      }));
      payload.append('contactDetails', JSON.stringify({
        email: form.email, phone: form.phone, website: form.website,
      }));
      payload.append('workingHours', JSON.stringify({
        start: form.workStart, end: form.workEnd, days: form.workDays,
      }));
      if (form.companyLogo) {
        payload.append('companyLogo', form.companyLogo);
      }

      if (modalMode === 'edit' && selected) {
        const { data } = await axios.put(`${API_BASE}/company/${selected._id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCompanies(prev => prev.map(c => c._id === selected._id ? data.result.company : c));
        showToast('Company updated successfully!');
      } else {
        const { data } = await axios.post(`${API_BASE}/company`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCompanies(prev => [data.result.company, ...prev]);
        showToast('Company created successfully!');
      }
      closeModal();
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message ?? 'Something went wrong' : 'Something went wrong';
      showToast(msg, 'error');
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/company/${selected._id}`);
      setCompanies(prev => prev.filter(c => c._id !== selected._id));
      showToast('Company deleted', 'warning');
      closeModal();
    } catch { showToast('Delete failed', 'error'); }
    finally { setLoading(false); }
  };

  const isViewMode   = modalMode === 'view';
  const isDeleteMode = modalMode === 'delete';

  return (
    <>
      <GlobalStyle />
      <PageWrapper>

        <TopBar>
          <TitleBlock>
            <PageTitle>Company <span>Setup</span></PageTitle>
            <PageSub>Manage your organisation profiles and working configurations</PageSub>
          </TitleBlock>
          <CreateBtn onClick={openCreate}>＋ Create Company</CreateBtn>
        </TopBar>

        <StatsRow>
          <StatCard $color={theme.accent}>
            <StatNum $color={theme.accent}>{companies.length}</StatNum>
            <StatLabel>Total Companies</StatLabel>
          </StatCard>
          <StatCard $color={theme.success}>
            <StatNum $color={theme.success}>{Array.from(new Set(companies.map(c => c.industry))).length}</StatNum>
            <StatLabel>Industries</StatLabel>
          </StatCard>
          <StatCard $color={theme.warning}>
            <StatNum $color={theme.warning}>{Array.from(new Set(companies.map(c => c.timeZone))).length}</StatNum>
            <StatLabel>Time Zones</StatLabel>
          </StatCard>
        </StatsRow>

        <TableWrap>
          <TableHeader>
            <TableTitle>📋 All Companies</TableTitle>
            <SearchBox placeholder="Search name, code, industry…" value={search} onChange={e => setSearch(e.target.value)} />
          </TableHeader>
          <Table>
            <thead>
              <tr>
                <Th>#</Th><Th>Company</Th><Th>Code</Th><Th>Industry</Th>
                <Th>Location</Th><Th>Time Zone</Th><Th>Hours</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                Array.from({length:4}).map((_,i) => <tr key={i}><td colSpan={8}><SkeletonRow /></td></tr>)
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8}>
                  <EmptyState>
                    <EmptyIcon>🏢</EmptyIcon>
                    <EmptyText>{search ? 'No companies match your search' : 'No companies yet — click "Create Company" to add one'}</EmptyText>
                  </EmptyState>
                </td></tr>
              ) : filtered.map((c, i) => (
                <Tr key={c._id} $index={i}>
                  <Td style={{color:theme.textMuted,fontSize:'0.76rem'}}>{i+1}</Td>
                  <Td>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      {c.companyLogo
                        ? <img src={c.companyLogo} alt="" style={{width:28,height:28,borderRadius:6,objectFit:'contain',border:`1px solid ${theme.border}`}} />
                        : <div style={{width:28,height:28,borderRadius:6,background:theme.accentDim,border:`1px solid ${theme.accent}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem'}}>🏢</div>
                      }
                      <span style={{fontWeight:600}}>{c.companyName}</span>
                    </div>
                  </Td>
                  <Td><CodeBadge>{c.companyCode}</CodeBadge></Td>
                  <Td><IndustryBadge $industry={c.industry}>{c.industry}</IndustryBadge></Td>
                  <Td style={{color:theme.textMuted,fontSize:'0.8rem'}}>
                    {[c.companyAddress?.city, c.companyAddress?.country].filter(Boolean).join(', ') || '—'}
                  </Td>
                  <Td><TzText>{c.timeZone}</TzText></Td>
                  <Td style={{fontSize:'0.8rem',color:theme.textMuted,fontFamily:"'JetBrains Mono',monospace"}}>
                    {c.workingHours?.start && c.workingHours?.end ? `${c.workingHours.start} – ${c.workingHours.end}` : '—'}
                  </Td>
                  <Td>
                    <ActionGroup>
                      <ActionBtn $variant="view"   title="View"   onClick={() => openView(c)}>👁</ActionBtn>
                      <ActionBtn $variant="edit"   title="Edit"   onClick={() => openEdit(c)}>✏️</ActionBtn>
                      <ActionBtn $variant="delete" title="Delete" onClick={() => openDelete(c)}>🗑</ActionBtn>
                    </ActionGroup>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>

      </PageWrapper>

      {/* Modal */}
      {modalMode && (
        <Overlay onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <Modal>
            <ModalHead>
              <ModalTitle>
                {isDeleteMode ? '🗑️' : isViewMode ? '👁️' : modalMode === 'create' ? '🏢' : '✏️'}
                &nbsp;
                {isDeleteMode ? 'Delete Company'
                  : isViewMode ? `Viewing — ${selected?.companyName}`
                  : modalMode === 'create' ? 'Create New Company'
                  : `Edit — ${selected?.companyName}`}
              </ModalTitle>
              <CloseBtn onClick={closeModal}>✕</CloseBtn>
            </ModalHead>

            <ModalBody>

              {isDeleteMode && selected && (
                <DeleteConfirmBox>
                  <DeleteIcon>⚠️</DeleteIcon>
                  <DeleteText>Delete "{selected.companyName}"?</DeleteText>
                  <DeleteSub>This action cannot be undone. All associated data will be removed.</DeleteSub>
                </DeleteConfirmBox>
              )}

              {isViewMode && selected && (
                <>
                  <SectionTitle>🏢 Basic Information</SectionTitle>
                  <DetailGrid>
                    <DetailItem><DetailLabel>Company Name</DetailLabel><DetailVal>{selected.companyName}</DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Company Code</DetailLabel><DetailVal><CodeBadge>{selected.companyCode}</CodeBadge></DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Industry</DetailLabel><DetailVal><IndustryBadge $industry={selected.industry}>{selected.industry}</IndustryBadge></DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Time Zone</DetailLabel><DetailVal><TzText>{selected.timeZone}</TzText></DetailVal></DetailItem>
                  </DetailGrid>

                  <SectionTitle $color={theme.success} style={{marginTop:18}}>📍 Address</SectionTitle>
                  <DetailGrid>
                    {['street','city','state','country','zipCode'].map(k => (
                      <DetailItem key={k}>
                        <DetailLabel>{k.charAt(0).toUpperCase()+k.slice(1)}</DetailLabel>
                        <DetailVal>{(selected.companyAddress as Record<string,string|undefined>)[k] || '—'}</DetailVal>
                      </DetailItem>
                    ))}
                  </DetailGrid>

                  <SectionTitle $color={theme.warning} style={{marginTop:18}}>📞 Contact</SectionTitle>
                  <DetailGrid>
                    {(['email','phone','website'] as const).map(k => (
                      <DetailItem key={k}><DetailLabel>{k}</DetailLabel><DetailVal>{selected.contactDetails?.[k] || '—'}</DetailVal></DetailItem>
                    ))}
                  </DetailGrid>

                  <SectionTitle $color='#7c3aed' style={{marginTop:18}}>🕐 Working Hours</SectionTitle>
                  <DetailGrid>
                    <DetailItem><DetailLabel>Hours</DetailLabel><DetailVal>{selected.workingHours?.start} – {selected.workingHours?.end}</DetailVal></DetailItem>
                    <DetailItem>
                      <DetailLabel>Working Days</DetailLabel>
                      <DetailVal style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:2}}>
                        {(selected.workingHours?.days ?? []).map(d => (
                          <span key={d} style={{padding:'2px 8px',borderRadius:5,background:theme.accentDim,border:`1px solid ${theme.accent}33`,color:theme.accent,fontSize:'0.71rem',fontWeight:700}}>{d}</span>
                        ))}
                      </DetailVal>
                    </DetailItem>
                    {selected.companyLogo && (
                      <DetailItem style={{gridColumn:'1/-1'}}>
                        <DetailLabel>Logo</DetailLabel>
                        <img src={selected.companyLogo} alt="logo" style={{width:60,height:60,borderRadius:8,objectFit:'contain',marginTop:6,border:`1px solid ${theme.border}`}} />
                      </DetailItem>
                    )}
                  </DetailGrid>
                </>
              )}

              {!isViewMode && !isDeleteMode && (
                <>
                  <SectionTitle>🏢 Basic Information</SectionTitle>
                  <Grid>
                    <LogoArea $hasLogo={!!form.companyLogoPreview}>
                      <input type="file" ref={fileRef} accept="image/*" style={{display:'none'}} onChange={handleLogo} />
                      <LogoPreview>
                        {form.companyLogoPreview
                          ? <img src={form.companyLogoPreview} alt="preview" />
                          : <span style={{fontSize:'1.3rem'}}>🖼️</span>}
                      </LogoPreview>
                      <LogoMeta>
                        <LogoLabel>{form.companyLogoPreview ? 'Logo selected ✓' : 'Upload Company Logo'}</LogoLabel>
                        <LogoHint>PNG, JPG or SVG · Uploaded to S3 · 200×200 px recommended</LogoHint>
                      </LogoMeta>
                    </LogoArea>

                    <FieldGroup>
                      <Label>Company Name <Required>*</Required></Label>
                      <StyledInput name="companyName" value={form.companyName} onChange={handleChange} placeholder="Acme Corporation" />
                      {errors.companyName && <ErrorMsg>{errors.companyName}</ErrorMsg>}
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Company Code <Required>*</Required></Label>
                      <StyledInput name="companyCode" value={form.companyCode} onChange={handleChange} placeholder="ACME" />
                      {errors.companyCode && <ErrorMsg>{errors.companyCode}</ErrorMsg>}
                    </FieldGroup>
                    <FieldGroup $full>
                      <Label>Industry <Required>*</Required></Label>
                      <StyledSelect name="industry" value={form.industry} onChange={handleChange}>
                        <option value="">Select industry…</option>
                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                      </StyledSelect>
                      {errors.industry && <ErrorMsg>{errors.industry}</ErrorMsg>}
                    </FieldGroup>
                  </Grid>

                  <SectionTitle $color={theme.success} style={{marginTop:20}}>📍 Address</SectionTitle>
                  <Grid>
                    <FieldGroup $full><Label>Street</Label><StyledInput name="street" value={form.street} onChange={handleChange} placeholder="123 Main Street" /></FieldGroup>
                    <FieldGroup><Label>City</Label><StyledInput name="city" value={form.city} onChange={handleChange} placeholder="Coimbatore" /></FieldGroup>
                    <FieldGroup><Label>State</Label><StyledInput name="state" value={form.state} onChange={handleChange} placeholder="Tamil Nadu" /></FieldGroup>
                    <FieldGroup><Label>Country</Label><StyledInput name="country" value={form.country} onChange={handleChange} placeholder="India" /></FieldGroup>
                    <FieldGroup><Label>ZIP Code</Label><StyledInput name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="641001" /></FieldGroup>
                  </Grid>

                  <SectionTitle $color={theme.warning} style={{marginTop:20}}>📞 Contact Details</SectionTitle>
                  <Grid>
                    <FieldGroup><Label>Email</Label><StyledInput name="email" type="email" value={form.email} onChange={handleChange} placeholder="info@acme.com" /></FieldGroup>
                    <FieldGroup><Label>Phone</Label><StyledInput name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" /></FieldGroup>
                    <FieldGroup $full><Label>Website</Label><StyledInput name="website" value={form.website} onChange={handleChange} placeholder="https://acme.com" /></FieldGroup>
                  </Grid>

                  <SectionTitle $color='#7c3aed' style={{marginTop:20}}>🕐 Time Zone &amp; Working Hours</SectionTitle>
                  <Grid>
                    <FieldGroup $full>
                      <Label>Time Zone</Label>
                      <StyledSelect name="timeZone" value={form.timeZone} onChange={handleChange}>
                        {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                      </StyledSelect>
                    </FieldGroup>
                    <FieldGroup><Label>Start Time</Label><StyledInput name="workStart" type="time" value={form.workStart} onChange={handleChange} /></FieldGroup>
                    <FieldGroup><Label>End Time</Label><StyledInput name="workEnd" type="time" value={form.workEnd} onChange={handleChange} /></FieldGroup>
                    <FieldGroup $full>
                      <Label>Working Days</Label>
                      <DaysRow>
                        {DAYS.map(day => (
                          <DayChip key={day} type="button" $active={form.workDays.includes(day)} onClick={() => toggleDay(day)}>{day}</DayChip>
                        ))}
                      </DaysRow>
                    </FieldGroup>
                  </Grid>
                </>
              )}
            </ModalBody>

            <ModalFoot>
              {isDeleteMode ? (
                <>
                  <SecondaryBtn onClick={closeModal} disabled={loading}>Cancel</SecondaryBtn>
                  <DangerBtn onClick={handleDelete} disabled={loading}>
                    {loading ? <><Spinner />Deleting…</> : '🗑 Confirm Delete'}
                  </DangerBtn>
                </>
              ) : isViewMode ? (
                <>
                  <SecondaryBtn onClick={closeModal}>Close</SecondaryBtn>
                  <PrimaryBtn onClick={() => { closeModal(); if (selected) openEdit(selected); }}>✏️ Edit</PrimaryBtn>
                </>
              ) : (
                <>
                  <SecondaryBtn onClick={closeModal} disabled={loading}>Cancel</SecondaryBtn>
                  <PrimaryBtn onClick={handleSave} disabled={loading}>
                    {loading ? <><Spinner />{modalMode === 'create' ? 'Creating…' : 'Saving…'}</> : modalMode === 'create' ? '🏢 Create Company' : '💾 Save Changes'}
                  </PrimaryBtn>
                </>
              )}
            </ModalFoot>
          </Modal>
        </Overlay>
      )}

      {toast && (
        <ToastBox $type={toast.type}>
          {toast.type==='success'?'✅':toast.type==='error'?'❌':'⚠️'} {toast.msg}
        </ToastBox>
      )}
    </>
  );
};

export default CompanySetup;