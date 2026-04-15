import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */

interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  type: string;
  image?: string;
  isActive: boolean;
  source?: string;
  sourceUrl?: string;
  ctaLink?: string;
  ctaText?: string;
  createdAt?: string;
}

/* ═══════════════════════════════════════
   API URL
═══════════════════════════════════════ */

const BASE    = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BASE.replace(/\/$/, "")}/resources`;

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */

const PageWrapper = styled.div`
  width: 100%;
  padding: 24px;
  @media (max-width: 768px) { padding: 16px; }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h1`font-size: 24px; font-weight: 700;`;

const DebugBar = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 12px;
  color: #166534;
  margin-bottom: 16px;
  word-break: break-all;
`;

const TabRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #f3f4f6;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${p => p.$active ? '#4f46e5' : '#6b7280'};
  border-bottom: 2.5px solid ${p => p.$active ? '#4f46e5' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;
`;

const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${p => p.$color};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 0 6px;
  margin-left: 6px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ $pending?: boolean }>`
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 2px solid ${p => p.$pending ? '#fef9c3' : '#f0fdf4'};
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.div`
  width: 100%;
  height: 160px;
  background: #f3f4f6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 13px;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const CardBody = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const TypeBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #4f46e5;
  background: #ede9fe;
  padding: 3px 8px;
  border-radius: 6px;
  text-transform: uppercase;
`;

const StatusBadge = styled.span<{ $active?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${p => p.$active ? '#dcfce7' : '#fef9c3'};
  color: ${p => p.$active ? '#166534' : '#854d0e'};
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  color: #111827;
  margin: 0;
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SourceLink = styled.a`
  font-size: 12px;
  color: #4f46e5;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const CardTime = styled.span`font-size: 11px; color: #9ca3af;`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #f3f4f6;
`;

const ApproveBtn = styled.button`
  flex: 1; padding: 10px; background: #4f46e5; color: #fff;
  border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer;
  &:hover { background: #4338ca; } &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const UnpublishBtn = styled.button`
  flex: 1; padding: 10px; background: #fef9c3; color: #854d0e;
  border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer;
  &:hover { background: #fef08a; } &:disabled { opacity: 0.5; }
`;

const EditBtn = styled.button`
  padding: 10px 13px; background: #e0e7ff; color: #3730a3;
  border: none; border-radius: 8px; font-size: 14px; cursor: pointer;
  &:hover { background: #c7d2fe; } &:disabled { opacity: 0.5; }
`;

const DeleteBtn = styled.button`
  padding: 10px 13px; background: #fee2e2; color: #b91c1c;
  border: none; border-radius: 8px; font-size: 14px; cursor: pointer;
  &:hover { background: #fecaca; } &:disabled { opacity: 0.5; }
`;

const EmptyState  = styled.div`text-align: center; padding: 60px 20px; color: #9ca3af; font-size: 15px;`;
const LoadingState = styled.div`text-align: center; padding: 40px; color: #6b7280;`;
const ErrorState  = styled.div`background: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; color: #b91c1c; font-size: 14px; margin-bottom: 16px;`;

/* ── MODAL ── */

const Backdrop = styled.div`
  position: fixed; inset: 0; background: rgba(15,23,42,0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 1200; padding: 16px;
`;

const ModalBox = styled.div`
  background: #fff; border-radius: 16px; padding: 24px;
  width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto;
`;

const ModalTitle = styled.h2`font-size: 20px; font-weight: 700; margin: 0 0 20px;`;

const FormGroup = styled.div`
  margin-bottom: 14px;
  label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 5px; }
`;

const Input = styled.input`
  padding: 10px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 14px; width: 100%; box-sizing: border-box;
  &:focus { outline: none; border-color: #4f46e5; }
`;

const Textarea = styled.textarea`
  padding: 10px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 14px; width: 100%; box-sizing: border-box; min-height: 100px; resize: vertical;
  &:focus { outline: none; border-color: #4f46e5; }
`;

const SelectInput = styled.select`
  padding: 10px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 14px; width: 100%; box-sizing: border-box;
`;

/* ── Image upload area ── */
const ImageUploadBox = styled.div`
  border: 2px dashed #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover { border-color: #4f46e5; }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const UploadHint = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 4px 0 0;
`;

const ModalActions = styled.div`display: flex; gap: 10px; margin-top: 20px;`;

const SaveBtn = styled.button`
  flex: 1; padding: 12px; background: #4f46e5; color: #fff;
  border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;
  &:hover { background: #4338ca; } &:disabled { opacity: 0.5; }
`;

const CancelBtn = styled.button`
  padding: 12px 20px; background: #f3f4f6; color: #374151;
  border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
`;

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

const ResourceAdmin = () => {
  const [allNews, setAllNews]       = useState<NewsItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string>("");
  const [tab, setTab]               = useState<"pending" | "approved">("pending");
  const [processing, setProcessing] = useState<string | null>(null);
  const [editOpen, setEditOpen]     = useState(false);
  const [editItem, setEditItem]     = useState<NewsItem | null>(null);
  const [saving, setSaving]         = useState(false);
  const [debugInfo, setDebugInfo]   = useState<string>("");

  // ✅ Image upload state
  const [imageFile, setImageFile]       = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef                    = useRef<HTMLInputElement>(null);

  /* ── FETCH ── */
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");
      const res  = await axios.get(API_URL);
      const data =
        Array.isArray(res.data)         ? res.data :
        Array.isArray(res.data?.data)   ? res.data.data :
        Array.isArray(res.data?.result) ? res.data.result : [];

      if (data.length > 0) {
        const types = Array.from(new Set(data.map((n: NewsItem) => n.type)));
        setDebugInfo(`API: ${API_URL} | Total: ${data.length} | Types: ${(types as string[]).join(", ")}`);
      } else {
        setDebugInfo(`API: ${API_URL} | No records found`);
      }
      setAllNews(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Unknown error";
      setError(`Failed to fetch: ${msg} | URL: ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  /* ── APPROVE ── */
  const handleApprove = async (id: string) => {
    try {
      setProcessing(id);
      await axios.put(`${API_URL}/${id}`, { isActive: true });
      setAllNews(prev => prev.map(n => n._id === id ? { ...n, isActive: true } : n));
    } catch (e: any) { alert("Failed: " + (e?.response?.data?.message || e.message)); }
    finally { setProcessing(null); }
  };

  /* ── UNPUBLISH ── */
  const handleUnpublish = async (id: string) => {
    try {
      setProcessing(id);
      await axios.put(`${API_URL}/${id}`, { isActive: false });
      setAllNews(prev => prev.map(n => n._id === id ? { ...n, isActive: false } : n));
    } catch (e: any) { alert("Failed: " + (e?.response?.data?.message || e.message)); }
    finally { setProcessing(null); }
  };

  /* ── DELETE ── */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      setProcessing(id);
      await axios.delete(`${API_URL}/${id}`);
      setAllNews(prev => prev.filter(n => n._id !== id));
    } catch (e: any) { alert("Failed: " + (e?.response?.data?.message || e.message)); }
    finally { setProcessing(null); }
  };

  /* ── OPEN EDIT ── */
  const openEdit = (item: NewsItem) => {
    setEditItem({ ...item });
    setImageFile(null);
    setImagePreview(item.image || "");
    setEditOpen(true);
  };

  /* ── HANDLE IMAGE PICK ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ── SAVE EDIT — uses FormData if image file selected, else JSON ── */
  const handleSaveEdit = async () => {
    if (!editItem) return;
    try {
      setSaving(true);

      if (imageFile) {
        // ✅ Upload image to S3 via multipart/form-data
        const form = new FormData();
        form.append("image",       imageFile);
        form.append("title",       editItem.title);
        form.append("description", editItem.description || "");
        form.append("type",        editItem.type);
        form.append("ctaText",     editItem.ctaText || editItem.source || "");
        form.append("ctaLink",     editItem.ctaLink || editItem.sourceUrl || "");
        form.append("source",      editItem.source  || editItem.ctaText  || "");
        form.append("sourceUrl",   editItem.sourceUrl || editItem.ctaLink || "");

        const res = await axios.put(`${API_URL}/${editItem._id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updated = res.data?.data || res.data;
        setAllNews(prev => prev.map(n => n._id === editItem._id ? { ...n, ...updated } : n));

      } else {
        // ✅ No new image — plain JSON update
        await axios.put(`${API_URL}/${editItem._id}`, {
          title:       editItem.title,
          description: editItem.description,
          type:        editItem.type,
          image:       editItem.image,
          ctaText:     editItem.ctaText  || editItem.source,
          ctaLink:     editItem.ctaLink  || editItem.sourceUrl,
          source:      editItem.source   || editItem.ctaText,
          sourceUrl:   editItem.sourceUrl || editItem.ctaLink,
        });
        setAllNews(prev => prev.map(n => n._id === editItem._id ? { ...n, ...editItem } : n));
      }

      setEditOpen(false);
      setEditItem(null);
      setImageFile(null);
      setImagePreview("");

    } catch (e: any) {
      alert("Failed to save: " + (e?.response?.data?.message || e.message));
    } finally { setSaving(false); }
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditItem(null);
    setImageFile(null);
    setImagePreview("");
  };

  /* ── TABS ── */
  const pendingNews  = allNews.filter(n => !n.isActive);
  const approvedNews = allNews.filter(n => n.isActive);
  const displayed    = tab === "pending" ? pendingNews : approvedNews;

  const timeAgo = (d?: string) => {
    if (!d) return "";
    const h = Math.floor((Date.now() - new Date(d).getTime()) / 3600000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <PageWrapper>
      <HeaderRow>
        <Title>Tech News Approval</Title>
      </HeaderRow>

      {debugInfo && <DebugBar>🔍 {debugInfo}</DebugBar>}
      {error     && <ErrorState>❌ {error}</ErrorState>}

      <TabRow>
        <Tab $active={tab === "pending"} onClick={() => setTab("pending")}>
          Pending Review
          {pendingNews.length > 0 && <Badge $color="#f59e0b">{pendingNews.length}</Badge>}
        </Tab>
        <Tab $active={tab === "approved"} onClick={() => setTab("approved")}>
          Approved / Live
          {approvedNews.length > 0 && <Badge $color="#16a34a">{approvedNews.length}</Badge>}
        </Tab>
      </TabRow>

      {loading ? (
        <LoadingState>Loading...</LoadingState>
      ) : displayed.length === 0 ? (
        <EmptyState>
          {allNews.length === 0
            ? `No records found. Check n8n is posting to: ${API_URL}`
            : tab === "pending" ? "✅ No pending news!" : "No approved news yet."}
        </EmptyState>
      ) : (
        <CardGrid>
          {displayed.map(news => (
            <Card key={news._id} $pending={!news.isActive}>
              <CardImage>
                {news.image
                  ? <img src={news.image} alt={news.title}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  : "No Image"}
              </CardImage>

              <CardBody>
                <CardMeta>
                  <TypeBadge>{news.type || "TECH"}</TypeBadge>
                  <StatusBadge $active={news.isActive}>
                    {news.isActive ? "✅ Live" : "⏳ Pending"}
                  </StatusBadge>
                  <CardTime>{timeAgo(news.createdAt)}</CardTime>
                </CardMeta>
                <CardTitle>{news.title}</CardTitle>
                {news.description && <CardDesc>{news.description}</CardDesc>}
                {(news.ctaLink || news.sourceUrl) && (
                  <SourceLink href={news.ctaLink || news.sourceUrl} target="_blank" rel="noopener noreferrer">
                    🔗 {news.ctaText || news.source || "View Source"}
                  </SourceLink>
                )}
              </CardBody>

              <CardActions>
                {!news.isActive ? (
                  <ApproveBtn onClick={() => handleApprove(news._id)} disabled={processing === news._id}>
                    {processing === news._id ? "..." : "✅ Approve"}
                  </ApproveBtn>
                ) : (
                  <UnpublishBtn onClick={() => handleUnpublish(news._id)} disabled={processing === news._id}>
                    {processing === news._id ? "..." : "⏸ Unpublish"}
                  </UnpublishBtn>
                )}
                <EditBtn   onClick={() => openEdit(news)}       disabled={processing === news._id}>✏️</EditBtn>
                <DeleteBtn onClick={() => handleDelete(news._id)} disabled={processing === news._id}>🗑</DeleteBtn>
              </CardActions>
            </Card>
          ))}
        </CardGrid>
      )}

      {/* ═══ EDIT MODAL ═══ */}
      {editOpen && editItem && (
        <Backdrop onClick={closeEdit}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <ModalTitle>✏️ Edit News</ModalTitle>

            <FormGroup>
              <label>Title *</label>
              <Input value={editItem.title}
                onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <Textarea value={editItem.description || ''}
                onChange={e => setEditItem({ ...editItem, description: e.target.value })} />
            </FormGroup>

            <FormGroup>
              <label>Type</label>
              <SelectInput value={editItem.type}
                onChange={e => setEditItem({ ...editItem, type: e.target.value })}>
                <option value="TECH">TECH</option>
                <option value="POLITICS">POLITICS</option>
                <option value="AGRI">AGRI</option>
                <option value="SPORTS">SPORTS</option>
                <option value="SOCIAL">SOCIAL</option>
              </SelectInput>
            </FormGroup>

            {/* ✅ IMAGE UPLOAD — click to pick file, uploads to S3 on save */}
            <FormGroup>
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <ImageUploadBox onClick={() => fileInputRef.current?.click()}>
                {imagePreview ? (
                  <>
                    <ImagePreview src={imagePreview} alt="preview" />
                    <UploadHint>Click to change image</UploadHint>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
                    <UploadHint>Click to upload image (JPG, PNG, WebP)</UploadHint>
                  </>
                )}
              </ImageUploadBox>
              {imageFile && (
                <UploadHint style={{ color: "#4f46e5", marginTop: 6 }}>
                  ✅ New image selected: {imageFile.name} — will upload to S3 on save
                </UploadHint>
              )}
              {/* Also allow pasting image URL directly */}
              <Input
                style={{ marginTop: 8 }}
                value={imageFile ? "" : (editItem.image || "")}
                onChange={e => {
                  setImageFile(null);
                  setImagePreview(e.target.value);
                  setEditItem({ ...editItem, image: e.target.value });
                }}
                placeholder="Or paste image URL directly..."
              />
            </FormGroup>

            <FormGroup>
              <label>Source URL</label>
              <Input value={editItem.ctaLink || editItem.sourceUrl || ''}
                onChange={e => setEditItem({ ...editItem, ctaLink: e.target.value, sourceUrl: e.target.value })}
                placeholder="https://..." />
            </FormGroup>

            <FormGroup>
              <label>Source Name</label>
              <Input value={editItem.ctaText || editItem.source || ''}
                onChange={e => setEditItem({ ...editItem, ctaText: e.target.value, source: e.target.value })}
                placeholder="TechCrunch, Wired..." />
            </FormGroup>

            <ModalActions>
              <SaveBtn onClick={handleSaveEdit} disabled={saving}>
                {saving ? "Saving..." : "💾 Save Changes"}
              </SaveBtn>
              <CancelBtn onClick={closeEdit}>Cancel</CancelBtn>
            </ModalActions>
          </ModalBox>
        </Backdrop>
      )}
    </PageWrapper>
  );
};

export default ResourceAdmin;