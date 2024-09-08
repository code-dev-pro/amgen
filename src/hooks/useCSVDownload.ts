import { useCallback, useState } from 'react';
import { useFormStore, FormData } from '../stores/formStore';
import { CORRECT_PIN } from '../utils/variables';

export const useCSVDownload = () => {
  const formDataList = useFormStore((state) => state.formDataList);
  const [showPinInput, setShowPinInput] = useState(false);

  const downloadCSV = useCallback(() => {
    if (formDataList.length === 0) {
      console.warn('Aucune donnée à télécharger');
      return;
    }

    const escapeCSV = (value: string): string => {
      if (value == null) return '';
      const stringValue = String(value).trim();
      if (stringValue.includes(';') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const headers: (keyof FormData)[] = [
      'contentPreference',
      'firstName',
      'lastName',
      'postalCode',
      'job',
      'email',
      'rpps',
      'address',
      'city',
      'phone',
    ];
    const csvContent = [headers.map((header) => escapeCSV(header)).join(';')];

    for (const item of formDataList) {
      const row = headers.map((header) => escapeCSV(item[header]));
      csvContent.push(row.join(';'));
    }

    // For Excel compatibility, BOM is required
    const BOM = '\uFEFF';
    const csvString = BOM + csvContent.join('\r\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'form_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [formDataList]);

  const handleLongPress = useCallback(() => {
    setShowPinInput(true);
  }, []);

  const handlePinSubmit = useCallback(
    (pin: string) => {
      if (pin === CORRECT_PIN) {
        downloadCSV();
      } else {
        alert('Code PIN incorrect');
      }
      setShowPinInput(false);
    },
    [downloadCSV]
  );

  const handlePinCancel = useCallback(() => {
    setShowPinInput(false);
  }, []);

  return { handleLongPress, showPinInput, handlePinSubmit, handlePinCancel };
};
