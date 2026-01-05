import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from 'react-native-paper';

interface SnackbarContextType {
  showSnackbar: (message: string, type?: 'error' | 'success' | 'warning' | 'info' | 'action') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// Cores de feedback conforme especificado
const SNACKBAR_COLORS = {
  error: '#EF4444',
  success: '#8CC63F',
  warning: '#F59E0B',
  info: '#3B82F6',
  action: '#E6007A',
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'error' | 'success' | 'warning' | 'info' | 'action'>('error');

  const showSnackbar = (msg: string, msgType: 'error' | 'success' | 'warning' | 'info' | 'action' = 'error') => {
    setMessage(msg);
    setType(msgType);
    setVisible(true);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  const getSnackbarStyle = () => {
    return { backgroundColor: SNACKBAR_COLORS[type] };
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={4000}
        style={getSnackbarStyle()}
        action={{
          label: 'Fechar',
          onPress: onDismiss,
          labelStyle: { color: '#FFF', fontWeight: 'bold' },
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar deve ser usado dentro de SnackbarProvider');
  }
  return context;
};

