"use client";

import React, { Component, ReactNode } from "react";
import type { ErrorState } from "../types";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState extends ErrorState {
  error?: Error;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅 (실제 애플리케이션에서는 Sentry 등의 서비스로 전송)
    console.error("웨딩 페이지 에러:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">💍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              문제가 발생했습니다
            </h2>
            <p className="text-gray-600 mb-6">
              페이지를 불러오는 중에 오류가 발생했습니다. 페이지를 새로고침
              해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
