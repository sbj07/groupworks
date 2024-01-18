import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function NoticeEditModal({ open, handleClose, noticeData }) {
  // 상태 관리를 위한 useState 훅 사용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 모달이 열릴 때 noticeData로부터 상태 초기화
  useEffect(() => {
    if (noticeData) {
      setTitle(noticeData.title);
      setContent(noticeData.content);
    }
  }, [noticeData]);

  // 데이터 저장 로직 (여기서는 예시로만 작성)
  const handleSave = () => {
    // 수정된 데이터를 서버로 전송하는 로직
    fetch(`http://127.0.0.1:8888/app/notice/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noticeNo: noticeData.noticeNo,
        title: title,
        content: content
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    handleClose(); // 모달 닫기
})
.catch((error) => {
  console.error('Error:', error);
  // 오류 처리 로직
});
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>공지사항 수정</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="제목"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="content"
          label="내용"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NoticeEditModal;
