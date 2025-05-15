import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  ReactNode,
} from "react";
import { View, Text, Animated } from "react-native";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast component
const Toast = ({
  message,
  type,
  onHide,
}: {
  message: string;
  type: ToastType;
  onHide: () => void;
}) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-800";
      case "error":
        return "bg-red-800";
      default:
        return "bg-dark-600";
    }
  };

  useEffect(() => {
    // Show toast
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide toast after duration
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
        position: "absolute",
        bottom: 100,
        left: 20,
        right: 20,
      }}
      className={`${getBgColor()} p-4 rounded-xl shadow-lg`}
    >
      <Text className="text-white text-center font-medium">{message}</Text>
    </Animated.View>
  );
};

// Provider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = ({
    message,
    type = "info",
    duration = 3000,
  }: ToastOptions) => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast message={toast.message} type={toast.type} onHide={hideToast} />
      )}
    </ToastContext.Provider>
  );
};

// Hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
