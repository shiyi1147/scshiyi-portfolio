import React, { useEffect, useRef, useState } from 'react';
import { Check, Link } from 'lucide-react';
import './ProjectLinkButton.css';

export default function ProjectLinkButton({ projectId }) {
  const [status, setStatus] = useState('');
  const inputRef = useRef(null);
  const timer = useRef(null);
  const url = new URL(document.querySelector('link[rel="canonical"]')?.href || '/', window.location.origin);
  url.search = '';
  url.hash = `top?work=${encodeURIComponent(projectId)}`;
  const link = url.href;
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === 'manual') { inputRef.current?.focus({ preventScroll: true }); inputRef.current?.select(); }
  }, [status]);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(link);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus(''), 2500);
    } catch { setStatus('manual'); }
  };
  return <div className="projectLink">
    <button type="button" className="projectLinkButton" onClick={copy} aria-label="复制项目链接">{status === 'copied' ? <Check size={14} aria-hidden="true"/> : <Link size={14} aria-hidden="true"/>}<span>{status === 'copied' ? '链接已复制' : '复制项目链接'}</span></button>
    <span className="projectLinkStatus" role="status" aria-live="polite">{status === 'copied' ? '项目链接已复制' : status === 'manual' ? '复制未成功，请选中下方链接手动复制' : ''}</span>
    {status === 'manual' && <div className="projectLinkFallback"><label>请长按或选中链接复制<input ref={inputRef} aria-label="项目链接" readOnly value={link} onFocus={event => event.target.select()} onClick={event => event.target.select()}/></label><button type="button" onClick={event => { setStatus(''); event.currentTarget.closest('.projectLink').querySelector('.projectLinkButton').focus(); }}>收起</button></div>}
  </div>;
}
