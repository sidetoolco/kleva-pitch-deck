/**
 * Export presentation to PDF using browser print functionality
 */
export const exportToPDF = () => {
  // Store original styles
  const originalStyles = document.body.style.cssText;
  
  // Apply print-specific styles
  const printStyles = `
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      
      .slide {
        page-break-after: always;
        page-break-inside: avoid;
        height: 100vh;
        width: 100vw;
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      .slide:last-child {
        page-break-after: auto;
      }
      
      /* Hide navigation and controls */
      nav, .nav-dots, .slide-counter, .presentation-controls {
        display: none !important;
      }
      
      /* Ensure proper text sizing */
      h1 { font-size: 48pt !important; }
      h2 { font-size: 36pt !important; }
      h3 { font-size: 24pt !important; }
      p { font-size: 14pt !important; }
      
      /* Force black text for better printing */
      * {
        color: black !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      /* Preserve backgrounds */
      .bg-black {
        background-color: black !important;
        color: white !important;
      }
      
      .bg-white {
        background-color: white !important;
      }
    }
  `;
  
  // Create and append style element
  const styleElement = document.createElement('style');
  styleElement.textContent = printStyles;
  document.head.appendChild(styleElement);
  
  // Trigger print dialog
  window.print();
  
  // Clean up
  setTimeout(() => {
    document.head.removeChild(styleElement);
    document.body.style.cssText = originalStyles;
  }, 1000);
};

/**
 * Export presentation data as JSON
 */
export const exportAsJSON = (slides: any[]) => {
  const data = {
    title: 'Kleva Pitch Deck',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    slides: slides.map((slide, index) => ({
      number: index + 1,
      id: slide.id || `slide-${index + 1}`,
      content: slide.content || '',
      notes: slide.notes || '',
    })),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kleva-deck-${Date.now()}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Generate speaker notes as text file
 */
export const exportSpeakerNotes = (slides: any[]) => {
  let notesContent = 'KLEVA PITCH DECK - SPEAKER NOTES\n';
  notesContent += '================================\n\n';
  
  slides.forEach((slide, index) => {
    notesContent += `SLIDE ${index + 1}: ${slide.title || 'Untitled'}\n`;
    notesContent += '-'.repeat(40) + '\n';
    notesContent += slide.notes || 'No notes for this slide.\n';
    notesContent += '\n\n';
  });
  
  const blob = new Blob([notesContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kleva-speaker-notes-${Date.now()}.txt`;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Copy slide link to clipboard
 */
export const copySlideLink = (slideId: string) => {
  const url = `${window.location.origin}${window.location.pathname}#${slideId}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Link copied to clipboard!';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    });
  } else {
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
};