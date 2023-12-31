import React from 'react';
import Navlanding from '@/components/navLanding';

function Home() {
    return (
        <>
            <Navlanding />
            <div className="bg-background text-text">
                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center h-screen px-4 pb-4 text-center">
                    <h1 className="text-5xl font-bold text-primary mb-4">Welcome to MedIQ</h1>
                    <p className="text-xl mb-6">
                        Your AI-powered first aid assistant.
                    </p>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition">
                        Learn More
                    </button>
                </section>

                {/* Features Section */}
                <section className="pb-12">
                    <div className="max-w-4xl mx-auto px-4 pb-6">
                        <h2 className="text-3xl font-bold text-center text-primary mb-8">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Feature 1 */}
                            <div className="p-6 border border-secondary rounded-lg">
                                <h3 className="text-2xl font-semibold mb-3">Real-Time Guidance</h3>
                                <p>
                                    Step-by-step first aid instructions tailored to specific emergencies.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="p-6 border border-secondary rounded-lg">
                                <h3 className="text-2xl font-semibold mb-3">Symptom Analysis</h3>
                                <p>
                                    Advanced AI to analyze symptoms and suggest immediate actions.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="p-6 border border-secondary rounded-lg">
                                <h3 className="text-2xl font-semibold mb-3">Symptom Analysis</h3>
                                <p>
                                    Advanced AI to analyze symptoms and suggest immediate actions.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="p-6 border border-secondary rounded-lg">
                                <h3 className="text-2xl font-semibold mb-3">Symptom Analysis</h3>
                                <p>
                                    Advanced AI to analyze symptoms and suggest immediate actions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-primary text-white py-6">
                    <div className="text-center">
                        <p>MedIQ &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Home;
