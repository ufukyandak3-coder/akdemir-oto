"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FDFBF7",
            fontFamily: "sans-serif",
            fontSize: "14px",
            opacity: 0.5,
          }}
        >
          Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
        </div>
      );
    }
    return this.props.children;
  }
}
