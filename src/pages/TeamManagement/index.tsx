// pages/TeamManagement/index.tsx
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import axios from 'axios';

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = {
  bg: '#f5f7fa', surface: '#ffffff', surfaceHigh: '#f8fafc', surfaceMid: '#f1f5f9',
  border: '#e2e8f0', borderLight: '#cbd5e1',
  accent: '#2563eb', accentDim: 'rgba(37,99,235,0.08)', accentDeep: '#1d4ed8',
  success: '#059669', successDim: 'rgba(5,150,105,0.08)',
  warning: '#d97706', warningDim: 'rgba(217,119,6,0.08)',
  error: '#dc2626', errorDim: 'rgba(220,38,38,0.08)',
  text: '#0f172a', textMuted: '#64748b', label: '#475569',
  purple: '#7c3aed', purpleDim: 'rgba(124,58,237,0.08)',
};

// ─── Constants ────────────────────────────────────────────────────────────────
const TEAM_TYPES = ['Engineering','Design','Marketing','Sales','Operations','HR','Finance','Product','Support','Other'] as const;
const DEPARTMENTS = ['Technology','Product','Marketing','Sales','Operations','Human Resources','Finance','Customer Success','Legal','Administration','Other'];
const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CompanyRef { _id: string; companyName: string; companyCode: string; companyLogo?: string; }
interface TeamDoc {
  _id: string; teamName: string; teamDescription: string;
  department: string; teamLead: string; teamType: string;
  company: CompanyRef; createdAt?: string;
}
interface FormState { teamName: string; teamDescription: string; department: string; teamLead: string; teamType: string; company: string; }
interface ToastState { msg: string; type: 'success' | 'error' | 'warning'; }
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
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${theme.surfaceHigh}}
  ::-webkit-scrollbar-thumb{background:${theme.borderLight};border-radius:3px}
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
const PageWrapper  = styled.div`min-height:100vh;background:${theme.bg};padding:32px 28px 80px;`;
const TopBar       = styled.div`display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;animation:${fadeUp} 0.35s ease both;`;
const TitleBlock   = styled.div``;
const PageTitle    = styled.h1`font-size:1.6rem;font-weight:800;color:${theme.text};letter-spacing:-0.5px;span{color:${theme.accent}}`;
const PageSub      = styled.p`color:${theme.textMuted};font-size:0.82rem;margin-top:3px`;
const StatsRow     = styled.div`display:flex;gap:14px;margin-bottom:24px;flex-wrap:wrap;animation:${fadeUp} 0.35s ease 0.05s both;`;
const StatCard     = styled.div<{$color:string}>`flex:1;min-width:130px;background:${theme.surface};border:1px solid ${theme.border};border-radius:12px;padding:16px 18px;position:relative;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);&::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:${p=>p.$color}}`;
const StatNum      = styled.div<{$color:string}>`font-size:1.7rem;font-weight:800;color:${p=>p.$color};line-height:1`;
const StatLabel    = styled.div`font-size:0.75rem;color:${theme.textMuted};margin-top:5px;font-weight:600;letter-spacing:0.3px`;
const CreateBtn    = styled.button`display:flex;align-items:center;gap:8px;padding:10px 20px;background:${theme.accent};color:#fff;border:none;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.875rem;font-weight:700;cursor:pointer;transition:all 0.18s;box-shadow:0 2px 8px rgba(37,99,235,0.3);&:hover{background:${theme.accentDeep};transform:translateY(-1px);box-shadow:0 4px 16px rgba(37,99,235,0.35)}`;

// ─── Table ────────────────────────────────────────────────────────────────────
const TableWrap   = styled.div`background:${theme.surface};border:1px solid ${theme.border};border-radius:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);animation:${fadeUp} 0.35s ease 0.1s both;`;
const TableHeader = styled.div`padding:16px 22px;border-bottom:1px solid ${theme.border};display:flex;align-items:center;justify-content:space-between;gap:12px;background:${theme.surface};`;
const TableTitle  = styled.h3`font-size:0.875rem;font-weight:700;color:${theme.text}`;
const SearchBox   = styled.input`background:${theme.surfaceHigh};border:1px solid ${theme.border};border-radius:8px;padding:7px 13px;font-size:0.82rem;font-family:'Plus Jakarta Sans',sans-serif;color:${theme.text};outline:none;width:220px;transition:border-color 0.18s,box-shadow 0.18s;&::placeholder{color:${theme.textMuted}}&:focus{border-color:${theme.accent};box-shadow:0 0 0 3px ${theme.accentDim}}`;
const Table       = styled.table`width:100%;border-collapse:collapse`;
const Th          = styled.th`padding:10px 18px;text-align:left;font-size:0.7rem;font-weight:700;color:${theme.textMuted};letter-spacing:0.7px;text-transform:uppercase;background:${theme.surfaceHigh};border-bottom:1px solid ${theme.border};white-space:nowrap;`;
const Tr          = styled.tr<{$index:number}>`border-bottom:1px solid ${theme.border};background:${p=>p.$index%2===0?theme.surface:theme.surfaceHigh};transition:background 0.14s;animation:${fadeIn} 0.3s ease both;animation-delay:${p=>p.$index*0.04}s;&:last-child{border-bottom:none}&:hover{background:${theme.accentDim}}`;
const Td          = styled.td`padding:12px 18px;font-size:0.845rem;color:${theme.text};vertical-align:middle`;

// ─── Badges ───────────────────────────────────────────────────────────────────
const typeColor = (t:string) => ({ Engineering:'#2563eb',Design:'#7c3aed',Marketing:'#db2777',Sales:'#059669',Operations:'#475569',HR:'#d97706',Finance:'#0891b2',Product:'#e11d48',Support:'#65a30d',Other:'#64748b' } as Record<string,string>)[t] || '#64748b';
const TypeBadge  = styled.span<{$type:string}>`font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:20px;background:${p=>typeColor(p.$type)}12;border:1px solid ${p=>typeColor(p.$type)}33;color:${p=>typeColor(p.$type)};`;
const DeptBadge  = styled.span`font-size:0.72rem;font-weight:600;padding:2px 8px;border-radius:5px;background:${theme.purpleDim};border:1px solid ${theme.purple}33;color:${theme.purple};`;
const CompanyChip = styled.div`display:inline-flex;align-items:center;gap:6px;font-size:0.79rem;font-weight:600;color:${theme.text};`;
const CompanyLogo = styled.div`width:22px;height:22px;border-radius:5px;overflow:hidden;flex-shrink:0;background:${theme.accentDim};border:1px solid ${theme.accent}33;display:flex;align-items:center;justify-content:center;font-size:0.6rem;img{width:100%;height:100%;object-fit:contain}`;

// ─── Action Buttons ───────────────────────────────────────────────────────────
const ActionGroup = styled.div`display:flex;gap:5px;align-items:center`;
const ActionBtn   = styled.button<{$variant:'view'|'edit'|'delete'}>`width:30px;height:30px;border-radius:7px;border:1px solid;cursor:pointer;font-size:0.78rem;display:flex;align-items:center;justify-content:center;transition:all 0.14s;${p=>p.$variant==='view'&&css`background:${theme.accentDim};border-color:${theme.accent}33;color:${theme.accent};&:hover{background:${theme.accent};color:#fff}`}${p=>p.$variant==='edit'&&css`background:${theme.successDim};border-color:${theme.success}33;color:${theme.success};&:hover{background:${theme.success};color:#fff}`}${p=>p.$variant==='delete'&&css`background:${theme.errorDim};border-color:${theme.error}33;color:${theme.error};&:hover{background:${theme.error};color:#fff}`}`;

// ─── Empty / Skeleton ─────────────────────────────────────────────────────────
const EmptyState  = styled.div`padding:60px 24px;text-align:center`;
const EmptyIcon   = styled.div`font-size:2.8rem;margin-bottom:12px;opacity:0.35`;
const EmptyText   = styled.p`color:${theme.textMuted};font-size:0.875rem`;
const SkeletonRow = styled.div`height:52px;border-bottom:1px solid ${theme.border};background:linear-gradient(90deg,${theme.surfaceHigh} 25%,${theme.surfaceMid} 50%,${theme.surfaceHigh} 75%);background-size:800px 100%;animation:${shimmer} 1.4s infinite;`;

// ─── Modal ────────────────────────────────────────────────────────────────────
const Overlay    = styled.div`position:fixed;inset:0;background:rgba(15,23,42,0.45);backdrop-filter:blur(4px);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px;animation:${fadeIn} 0.2s ease;`;
const Modal      = styled.div`background:${theme.surface};border:1px solid ${theme.border};border-radius:16px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;animation:${scaleIn} 0.22s ease;box-shadow:0 20px 60px rgba(0,0,0,0.15),0 0 0 1px ${theme.border};`;
const ModalHead  = styled.div`padding:18px 24px 14px;border-bottom:1px solid ${theme.border};display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:${theme.surface};z-index:1;`;
const ModalTitle = styled.h2`font-size:0.975rem;font-weight:700;color:${theme.text};display:flex;align-items:center;gap:8px;`;
const CloseBtn   = styled.button`width:28px;height:28px;border-radius:7px;background:${theme.surfaceHigh};border:1px solid ${theme.border};color:${theme.textMuted};cursor:pointer;font-size:0.95rem;display:flex;align-items:center;justify-content:center;transition:all 0.14s;&:hover{background:${theme.errorDim};border-color:${theme.error}44;color:${theme.error}}`;
const ModalBody  = styled.div`padding:22px 24px`;
const ModalFoot  = styled.div`padding:14px 24px;border-top:1px solid ${theme.border};display:flex;justify-content:flex-end;gap:10px;position:sticky;bottom:0;background:${theme.surface};`;

// ─── Form ─────────────────────────────────────────────────────────────────────
const SectionTitle   = styled.h3<{$color?:string}>`font-size:0.72rem;font-weight:700;color:${p=>p.$color||theme.accent};letter-spacing:0.9px;text-transform:uppercase;margin-bottom:12px;margin-top:20px;display:flex;align-items:center;gap:8px;&:first-child{margin-top:0}&::after{content:'';flex:1;height:1px;background:${p=>p.$color||theme.accent}22}`;
const Grid           = styled.div<{$cols?:string}>`display:grid;grid-template-columns:${p=>p.$cols||'repeat(2,1fr)'};gap:13px;@media(max-width:560px){grid-template-columns:1fr}`;
const FieldGroup     = styled.div<{$full?:boolean}>`display:flex;flex-direction:column;gap:5px;${p=>p.$full&&css`grid-column:1/-1`}`;
const Label          = styled.label`font-size:0.71rem;font-weight:700;color:${theme.label};letter-spacing:0.5px;text-transform:uppercase`;
const Required       = styled.span`color:${theme.error};margin-left:2px`;
const inputStyles    = css`width:100%;background:${theme.surface};border:1.5px solid ${theme.border};border-radius:8px;padding:9px 12px;font-size:0.85rem;font-family:'Plus Jakarta Sans',sans-serif;color:${theme.text};outline:none;transition:border-color 0.18s,box-shadow 0.18s;&::placeholder{color:${theme.textMuted}}&:focus{border-color:${theme.accent};box-shadow:0 0 0 3px ${theme.accentDim}}&:disabled{opacity:0.55;cursor:not-allowed;background:${theme.surfaceHigh}}`;
const StyledInput    = styled.input`${inputStyles}`;
const StyledSelect   = styled.select`${inputStyles}cursor:pointer;option{background:${theme.surface}}`;
const StyledTextarea = styled.textarea`${inputStyles}resize:vertical;min-height:80px;line-height:1.55;`;
const ErrorMsg       = styled.span`font-size:0.71rem;color:${theme.error};font-weight:500`;

// ─── Company Selector ─────────────────────────────────────────────────────────
const CompanySelectGrid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:9px;margin-top:4px;`;
const CompanySelectCard = styled.button<{$selected:boolean}>`padding:11px 13px;border-radius:9px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;text-align:left;transition:all 0.16s;background:${p=>p.$selected?theme.accentDim:theme.surfaceHigh};border:2px solid ${p=>p.$selected?theme.accent:theme.border};&:hover{border-color:${theme.accent};background:${theme.accentDim}}`;
const CardCompanyName   = styled.p`font-size:0.82rem;font-weight:700;color:${theme.text}`;
const CardCompanyCode   = styled.p`font-size:0.68rem;color:${theme.textMuted};margin-top:2px;font-family:'JetBrains Mono',monospace`;

// ─── View Detail ──────────────────────────────────────────────────────────────
const DetailGrid  = styled.div`display:grid;grid-template-columns:repeat(2,1fr);gap:10px;@media(max-width:480px){grid-template-columns:1fr}`;
const DetailItem  = styled.div`background:${theme.surfaceHigh};border:1px solid ${theme.border};border-radius:9px;padding:11px 13px`;
const DetailLabel = styled.div`font-size:0.67rem;color:${theme.textMuted};text-transform:uppercase;letter-spacing:0.6px;font-weight:700;margin-bottom:4px`;
const DetailVal   = styled.div`font-size:0.845rem;color:${theme.text};font-weight:500;word-break:break-all`;

// ─── Delete ───────────────────────────────────────────────────────────────────
const DeleteConfirmBox = styled.div`background:${theme.errorDim};border:1px solid ${theme.error}33;border-radius:10px;padding:24px;text-align:center`;
const DeleteIcon = styled.div`font-size:2.4rem;margin-bottom:10px`;
const DeleteText = styled.p`color:${theme.text};font-size:0.9rem;font-weight:600;margin-bottom:4px`;
const DeleteSub  = styled.p`color:${theme.textMuted};font-size:0.8rem`;

// ─── Buttons ──────────────────────────────────────────────────────────────────
const Btn          = styled.button`padding:9px 20px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;font-weight:700;cursor:pointer;border:none;display:flex;align-items:center;gap:7px;transition:all 0.18s;&:disabled{opacity:0.45;cursor:not-allowed}`;
const PrimaryBtn   = styled(Btn)`background:${theme.accent};color:#fff;&:hover:not(:disabled){background:${theme.accentDeep};transform:translateY(-1px)}`;
const SecondaryBtn = styled(Btn)`background:${theme.surfaceHigh};color:${theme.text};border:1.5px solid ${theme.border};&:hover:not(:disabled){border-color:${theme.accent};color:${theme.accent}}`;
const DangerBtn    = styled(Btn)`background:${theme.errorDim};color:${theme.error};border:1.5px solid ${theme.error}33;&:hover:not(:disabled){background:${theme.error};color:#fff}`;
const Spinner      = styled.div`width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:${spin} 0.6s linear infinite`;

// ─── Toast ────────────────────────────────────────────────────────────────────
const toastColor = (t:string) => t==='success'?theme.success:t==='error'?theme.error:theme.warning;
const toastBg    = (t:string) => t==='success'?theme.successDim:t==='error'?theme.errorDim:theme.warningDim;
const ToastBox   = styled.div<{$type:ToastState['type']}>`position:fixed;bottom:24px;right:24px;padding:12px 18px;border-radius:10px;font-size:0.84rem;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;background:${p=>toastBg(p.$type)};border:1.5px solid ${p=>toastColor(p.$type)}44;color:${p=>toastColor(p.$type)};animation:${fadeUp} 0.25s ease;z-index:9999;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(0,0,0,0.1);`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initialForm: FormState = { teamName:'', teamDescription:'', department:'', teamLead:'', teamType:'', company:'' };

// safely converts a TeamDoc back into a form-editable shape
const docToForm = (t: TeamDoc): FormState => ({
  teamName:        typeof t.teamName        === 'string' ? t.teamName        : '',
  teamDescription: typeof t.teamDescription === 'string' ? t.teamDescription : '',
  department:      typeof t.department      === 'string' ? t.department      : '',
  teamLead:        typeof t.teamLead        === 'string' ? t.teamLead        : '',
  teamType:        typeof t.teamType        === 'string' ? t.teamType        : '',
  company:         t.company && typeof t.company === 'object' ? t.company._id ?? '' : '',
});

// safely lowercases any value that might be undefined/null
const safe = (v: unknown): string => (v != null && typeof v === 'string' ? v : '').toLowerCase();

// ─── Component ────────────────────────────────────────────────────────────────
const TeamManagement: React.FC = () => {
  const [teams,     setTeams]     = useState<TeamDoc[]>([]);
  const [filtered,  setFiltered]  = useState<TeamDoc[]>([]);
  const [companies, setCompanies] = useState<CompanyRef[]>([]);
  const [search,    setSearch]    = useState('');
  const [fetching,  setFetching]  = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected,  setSelected]  = useState<TeamDoc | null>(null);
  const [form,      setForm]      = useState<FormState>(initialForm);
  const [errors,    setErrors]    = useState<Partial<Record<keyof FormState,string>>>({});
  const [loading,   setLoading]   = useState(false);
  const [toast,     setToast]     = useState<ToastState | null>(null);

  const showToast = useCallback((msg:string, type:ToastState['type']='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // ── Data loading ────────────────────────────────────────────────────────────
  const loadCompanies = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/company`);
      setCompanies(data?.result?.companies ?? []);
    } catch {
      showToast('Failed to load companies', 'error');
    }
  }, [showToast]);

  const loadTeams = useCallback(async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(`${API_BASE}/teams`);
      // normalise: ensure every team has string fields so filter never crashes
      const raw: unknown[] = data?.result?.teams ?? [];
      const list: TeamDoc[] = raw.map((item: any) => ({
        _id:             item._id             ?? '',
        teamName:        item.teamName        ?? '',
        teamDescription: item.teamDescription ?? '',
        department:      item.department      ?? '',
        teamLead:        item.teamLead        ?? '',
        teamType:        item.teamType        ?? '',
        company:         item.company         ?? {},
        createdAt:       item.createdAt,
      }));
      setTeams(list);
      setFiltered(list);
    } catch {
      showToast('Failed to load teams', 'error');
    } finally {
      setFetching(false);
    }
  }, [showToast]);

  useEffect(() => { loadCompanies(); loadTeams(); }, [loadCompanies, loadTeams]);

  // ── Search filter — uses safe() so no field can crash with toLowerCase ──────
  useEffect(() => {
    const q = search.toLowerCase();
    if (!q) { setFiltered(teams); return; }
    setFiltered(
      teams.filter(t =>
        safe(t.teamName).includes(q)              ||
        safe(t.department).includes(q)            ||
        safe(t.teamType).includes(q)              ||
        safe(t.teamLead).includes(q)              ||
        safe(t.company?.companyName).includes(q)  ||
        safe(t.company?.companyCode).includes(q)
      )
    );
  }, [search, teams]);

  // ── Modal helpers ───────────────────────────────────────────────────────────
  const openCreate = () => { setForm(initialForm); setErrors({}); setSelected(null); setModalMode('create'); };
  const openEdit   = (t:TeamDoc) => { setForm(docToForm(t)); setErrors({}); setSelected(t); setModalMode('edit'); };
  const openView   = (t:TeamDoc) => { setSelected(t); setModalMode('view'); };
  const openDelete = (t:TeamDoc) => { setSelected(t); setModalMode('delete'); };
  const closeModal = () => { setModalMode(null); setSelected(null); };

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const selectCompany = (id:string) => {
    setForm(p => ({ ...p, company: id }));
    if (errors.company) setErrors(p => ({ ...p, company: '' }));
  };

  const validate = (): boolean => {
    const err: Partial<Record<keyof FormState,string>> = {};
    if (!form.teamName.trim())   err.teamName   = 'Required';
    if (!form.department.trim()) err.department = 'Required';
    if (!form.teamType)          err.teamType   = 'Required';
    if (!form.company)           err.company    = 'Please select a company';
    setErrors(err);
    return !Object.keys(err).length;
  };

  // ── Save (create / edit) ────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        teamName:        form.teamName.trim(),
        teamDescription: form.teamDescription.trim(),
        department:      form.department.trim(),
        teamLead:        form.teamLead.trim(),
        teamType:        form.teamType,
        company:         form.company,
      };

      if (modalMode === 'edit' && selected) {
        const { data } = await axios.put(`${API_BASE}/teams/${selected._id}`, payload);
        const updated: TeamDoc = data.result.team;
        setTeams(prev => prev.map(t => t._id === selected._id ? updated : t));
        showToast('Team updated successfully!');
      } else {
        const { data } = await axios.post(`${API_BASE}/teams`, payload);
        setTeams(prev => [data.result.team, ...prev]);
        showToast('Team created successfully!');
      }
      closeModal();
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message ?? 'Something went wrong' : 'Something went wrong';
      showToast(msg, 'error');
    } finally { setLoading(false); }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/teams/${selected._id}`);
      setTeams(prev => prev.filter(t => t._id !== selected._id));
      showToast('Team deleted successfully', 'warning');
      closeModal();
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.response?.data?.error ?? 'Delete failed'
        : 'Delete failed';
      showToast(msg, 'error');
    } finally { setLoading(false); }
  };

  // ── Derived stats ───────────────────────────────────────────────────────────
  const uniqueDepts     = new Set(teams.map(t => t.department)).size;
  const uniqueTypes     = new Set(teams.map(t => t.teamType)).size;
  const uniqueCompanies = new Set(teams.map(t => t.company?._id).filter(Boolean)).size;

  const isViewMode   = modalMode === 'view';
  const isDeleteMode = modalMode === 'delete';

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <GlobalStyle />
      <PageWrapper>

        <TopBar>
          <TitleBlock>
            <PageTitle>Team <span>Management</span></PageTitle>
            <PageSub>Create and manage teams across your companies and departments</PageSub>
          </TitleBlock>
          <CreateBtn onClick={openCreate}>＋ Create Team</CreateBtn>
        </TopBar>

        <StatsRow>
          <StatCard $color={theme.accent}><StatNum $color={theme.accent}>{teams.length}</StatNum><StatLabel>Total Teams</StatLabel></StatCard>
          <StatCard $color={theme.purple}><StatNum $color={theme.purple}>{uniqueDepts}</StatNum><StatLabel>Departments</StatLabel></StatCard>
          <StatCard $color={theme.success}><StatNum $color={theme.success}>{uniqueTypes}</StatNum><StatLabel>Team Types</StatLabel></StatCard>
          <StatCard $color={theme.warning}><StatNum $color={theme.warning}>{uniqueCompanies}</StatNum><StatLabel>Companies</StatLabel></StatCard>
        </StatsRow>

        <TableWrap>
          <TableHeader>
            <TableTitle>👥 All Teams</TableTitle>
            <SearchBox placeholder="Search name, department, company…" value={search} onChange={e => setSearch(e.target.value)} />
          </TableHeader>
          <Table>
            <thead>
              <tr><Th>#</Th><Th>Team Name</Th><Th>Company</Th><Th>Department</Th><Th>Type</Th><Th>Team Lead</Th><Th>Actions</Th></tr>
            </thead>
            <tbody>
              {fetching ? (
                Array.from({length:4}).map((_,i) => <tr key={i}><td colSpan={7}><SkeletonRow /></td></tr>)
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7}>
                  <EmptyState>
                    <EmptyIcon>👥</EmptyIcon>
                    <EmptyText>{search ? 'No teams match your search' : 'No teams yet — click "Create Team" to add one'}</EmptyText>
                  </EmptyState>
                </td></tr>
              ) : filtered.map((t,i) => (
                <Tr key={t._id} $index={i}>
                  <Td style={{color:theme.textMuted,fontSize:'0.76rem'}}>{i+1}</Td>
                  <Td>
                    <div style={{display:'flex',flexDirection:'column',gap:2}}>
                      <span style={{fontWeight:700}}>{t.teamName}</span>
                      {t.teamDescription && (
                        <span style={{fontSize:'0.75rem',color:theme.textMuted,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                          {t.teamDescription}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <CompanyChip>
                      <CompanyLogo>
                        {t.company?.companyLogo ? <img src={t.company.companyLogo} alt="" /> : '🏢'}
                      </CompanyLogo>
                      <div>
                        <div style={{fontSize:'0.8rem',fontWeight:600}}>{t.company?.companyName || '—'}</div>
                        {t.company?.companyCode && (
                          <div style={{fontSize:'0.68rem',color:theme.textMuted,fontFamily:"'JetBrains Mono',monospace"}}>{t.company.companyCode}</div>
                        )}
                      </div>
                    </CompanyChip>
                  </Td>
                  <Td><DeptBadge>{t.department || '—'}</DeptBadge></Td>
                  <Td><TypeBadge $type={t.teamType || 'Other'}>{t.teamType || '—'}</TypeBadge></Td>
                  <Td style={{color:theme.textMuted,fontSize:'0.82rem'}}>{t.teamLead || <span style={{opacity:0.4}}>—</span>}</Td>
                  <Td>
                    <ActionGroup>
                      <ActionBtn $variant="view"   title="View"   onClick={()=>openView(t)}>👁</ActionBtn>
                      <ActionBtn $variant="edit"   title="Edit"   onClick={()=>openEdit(t)}>✏️</ActionBtn>
                      <ActionBtn $variant="delete" title="Delete" onClick={()=>openDelete(t)}>🗑</ActionBtn>
                    </ActionGroup>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>

      </PageWrapper>

      {/* ── Modal ── */}
      {modalMode && (
        <Overlay onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <Modal>
            <ModalHead>
              <ModalTitle>
                {isDeleteMode ? '🗑️' : isViewMode ? '👁️' : modalMode === 'create' ? '👥' : '✏️'}
                &nbsp;
                {isDeleteMode ? 'Delete Team'
                  : isViewMode ? `Viewing — ${selected?.teamName}`
                  : modalMode === 'create' ? 'Create New Team'
                  : `Edit — ${selected?.teamName}`}
              </ModalTitle>
              <CloseBtn onClick={closeModal}>✕</CloseBtn>
            </ModalHead>

            <ModalBody>

              {/* Delete confirm */}
              {isDeleteMode && selected && (
                <DeleteConfirmBox>
                  <DeleteIcon>⚠️</DeleteIcon>
                  <DeleteText>Delete "{selected.teamName}"?</DeleteText>
                  <DeleteSub>This action cannot be undone. The team will be permanently removed.</DeleteSub>
                </DeleteConfirmBox>
              )}

              {/* View */}
              {isViewMode && selected && (
                <>
                  <SectionTitle>👥 Team Information</SectionTitle>
                  <DetailGrid>
                    <DetailItem><DetailLabel>Team Name</DetailLabel><DetailVal>{selected.teamName}</DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Team Type</DetailLabel><DetailVal><TypeBadge $type={selected.teamType}>{selected.teamType}</TypeBadge></DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Department</DetailLabel><DetailVal><DeptBadge>{selected.department}</DeptBadge></DetailVal></DetailItem>
                    <DetailItem><DetailLabel>Team Lead</DetailLabel><DetailVal>{selected.teamLead || '—'}</DetailVal></DetailItem>
                    {selected.teamDescription && (
                      <DetailItem style={{gridColumn:'1/-1'}}>
                        <DetailLabel>Description</DetailLabel>
                        <DetailVal>{selected.teamDescription}</DetailVal>
                      </DetailItem>
                    )}
                  </DetailGrid>
                  <SectionTitle $color={theme.warning} style={{marginTop:18}}>🏢 Company</SectionTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Company Name</DetailLabel>
                      <DetailVal>
                        <CompanyChip>
                          <CompanyLogo>{selected.company?.companyLogo ? <img src={selected.company.companyLogo} alt="" /> : '🏢'}</CompanyLogo>
                          {selected.company?.companyName || '—'}
                        </CompanyChip>
                      </DetailVal>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Company Code</DetailLabel>
                      <DetailVal style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'0.82rem',color:theme.accent}}>{selected.company?.companyCode || '—'}</DetailVal>
                    </DetailItem>
                  </DetailGrid>
                </>
              )}

              {/* Create / Edit form */}
              {!isViewMode && !isDeleteMode && (
                <>
                  <SectionTitle $color={theme.warning}>🏢 Select Company <Required>*</Required></SectionTitle>
                  {companies.length === 0 ? (
                    <div style={{padding:'14px',background:theme.warningDim,borderRadius:9,border:`1px solid ${theme.warning}33`,fontSize:'0.83rem',color:theme.warning,fontWeight:600}}>
                      ⚠️ No companies found. Please create a company first.
                    </div>
                  ) : (
                    <CompanySelectGrid>
                      {companies.map(c => (
                        <CompanySelectCard key={c._id} type="button" $selected={form.company === c._id} onClick={() => selectCompany(c._id)}>
                          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
                            <CompanyLogo>{c.companyLogo ? <img src={c.companyLogo} alt="" /> : '🏢'}</CompanyLogo>
                            <CardCompanyName>{c.companyName}</CardCompanyName>
                          </div>
                          <CardCompanyCode>{c.companyCode}</CardCompanyCode>
                        </CompanySelectCard>
                      ))}
                    </CompanySelectGrid>
                  )}
                  {errors.company && <ErrorMsg style={{marginTop:6,display:'block'}}>{errors.company}</ErrorMsg>}

                  <SectionTitle style={{marginTop:20}}>👥 Team Details</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>Team Name <Required>*</Required></Label>
                      <StyledInput name="teamName" value={form.teamName} onChange={handleChange} placeholder="e.g. Frontend Squad" />
                      {errors.teamName && <ErrorMsg>{errors.teamName}</ErrorMsg>}
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Team Lead</Label>
                      <StyledInput name="teamLead" value={form.teamLead} onChange={handleChange} placeholder="e.g. Arjun Kumar" />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Department <Required>*</Required></Label>
                      <StyledSelect name="department" value={form.department} onChange={handleChange}>
                        <option value="">Select department…</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </StyledSelect>
                      {errors.department && <ErrorMsg>{errors.department}</ErrorMsg>}
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Team Type <Required>*</Required></Label>
                      <StyledSelect name="teamType" value={form.teamType} onChange={handleChange}>
                        <option value="">Select type…</option>
                        {TEAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </StyledSelect>
                      {errors.teamType && <ErrorMsg>{errors.teamType}</ErrorMsg>}
                    </FieldGroup>
                    <FieldGroup $full>
                      <Label>Team Description</Label>
                      <StyledTextarea name="teamDescription" value={form.teamDescription} onChange={handleChange} placeholder="Briefly describe this team's purpose and responsibilities…" rows={3} />
                    </FieldGroup>
                  </Grid>
                </>
              )}

            </ModalBody>

            <ModalFoot>
              {isDeleteMode ? (
                <>
                  <SecondaryBtn onClick={closeModal} disabled={loading}>Cancel</SecondaryBtn>
                  <DangerBtn onClick={handleDelete} disabled={loading}>{loading ? <><Spinner />Deleting…</> : '🗑 Confirm Delete'}</DangerBtn>
                </>
              ) : isViewMode ? (
                <>
                  <SecondaryBtn onClick={closeModal}>Close</SecondaryBtn>
                  <PrimaryBtn onClick={() => { closeModal(); if (selected) openEdit(selected); }}>✏️ Edit</PrimaryBtn>
                </>
              ) : (
                <>
                  <SecondaryBtn onClick={closeModal} disabled={loading}>Cancel</SecondaryBtn>
                  <PrimaryBtn onClick={handleSave} disabled={loading || companies.length === 0}>
                    {loading ? <><Spinner />{modalMode === 'create' ? 'Creating…' : 'Saving…'}</> : modalMode === 'create' ? '👥 Create Team' : '💾 Save Changes'}
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

export default TeamManagement;