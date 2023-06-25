import { useState } from 'react';
import './reportModal.css';
import { Modal } from '@mui/material';
import { FormHelperText, Textarea, Typography } from '@mui/joy';
import { toast } from 'react-hot-toast';
const MAX_REPORT_CHARS = 300;
interface PropsType {
  isReportModal: boolean;
  setIsReportModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const REPORT_REGEX = '^(?:.*[a-zA-Z]){10,300}.*$';

//להוסיף שליחת רפורט לבאקנד
//להגביל אנשים לרפורט אחד פר פוסט
//להוסיף באדמין מוד את כל הרפורטים

function ReportModal({ isReportModal, setIsReportModal }: PropsType) {
  const [reportText, setReportText] = useState('');
  const [reportError, setReportError] = useState('');
  const isError = Boolean(reportError);
  const closeModal = () => {
    setIsReportModal(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_REPORT_CHARS) {
      setReportText(e.target.value);
    }
  };
  const onCancelClick = () => {
    setReportError('');
    setReportText('');
    closeModal();
  };
  const onSendClick = () => {
    if (reportText.match(REPORT_REGEX)) {
      toast.success('Report sent succsessfully');
      setReportError('');
      setReportText('');
      closeModal();
    } else {
      setReportError('Text must be between 10 to 300 letters');
    }
  };
  return (
    <Modal
      open={isReportModal}
      onClose={() => setIsReportModal(false)}
      className="report-modal-container"
    >
      <div className="report-modal">
        <h1 className="report-headline">Report</h1>

        <Textarea
          value={reportText}
          onChange={onChange}
          maxRows={4}
          minRows={4}
          placeholder="Text"
          required={true}
          variant="soft"
          className="report-text"
          error={isError}
          size="sm"
          endDecorator={
            <Typography level="body3" sx={{ ml: 'auto' }}>
              {MAX_REPORT_CHARS - reportText.length} character(s)
            </Typography>
          }
        ></Textarea>
        {isError && (
          <FormHelperText className="report-error-text">
            {reportError}
          </FormHelperText>
        )}
        <div className="report-buttons-container">
          <button className="report-button-cancel" onClick={onCancelClick}>
            CANCEL
          </button>
          <button className="report-button-send" onClick={onSendClick}>
            SEND
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ReportModal;
