import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2dd4bf', // teal-400 matching the logo .es
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ margin: 'auto' }}
                >
                    <path d="M12 2L1 8l11 6 9-4.91V17h2V9L12 2zm0 2.18l7.27 3.96L12 12.13 4.73 8.16 12 4.18zM3.82 10.36l1.45.8v4.91c0 1.99 3.03 3.6 6.73 3.6s6.73-1.61 6.73-3.6v-4.91l1.45-.8V16c0 2.87-3.9 5-8.18 5s-8.18-2.13-8.18-5v-5.64z" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
