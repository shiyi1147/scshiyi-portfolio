import React, { useState } from 'react';
export default function ContactActions() {
  const [message, setMessage] = useState('');
  const copy = async (label, value) => {
    try { await navigator.clipboard.writeText(value); setMessage(label + '已复制'); }
    catch { setMessage('复制未成功，请长按或选中下方文字复制：' + value); }
  };
  return <div className="contactActions">
    <div className="contactActionButtons"><button type="button" onClick={() => copy('邮箱', '1483399012@qq.com')}>复制邮箱</button><button type="button" onClick={() => copy('手机号', '13347214948')}>复制手机号</button><a href="tel:13347214948">拨打电话</a></div>
    <p role="status" aria-live="polite" className="contactCopyStatus">{message || '邮箱与手机号均可直接复制'}</p>
  </div>;
}
