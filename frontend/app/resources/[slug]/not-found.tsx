import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-[#D8D0CA] min-h-screen flex items-center justify-center">
            <div className="text-center flex flex-col items-center p-8 bg-[#D4C8C0] rounded-3xl max-w-lg shadow-sm">
                <h2 className="font-sans text-[48px] font-bold text-[#1D2331] mb-4">Blog Not Found</h2>
                <p className="font-sans text-[18px] text-[#1D2331]/80 mb-8">
                    The requested article does not exist.
                </p>
                <Link 
                    href="/resources" 
                    className="bg-[#ED3D3D] text-white px-8 py-3 rounded-full font-mono text-[16px] font-medium hover:bg-red-600 transition-colors"
                >
                    Back to Resources
                </Link>
            </div>
        </div>
    );
}
