import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-red-500">
                            Something went wrong 😓
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Please refresh the page
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}