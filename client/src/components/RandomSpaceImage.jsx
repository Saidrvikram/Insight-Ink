import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Alert, Spinner } from 'flowbite-react';

function RandomSpaceImages() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRandomSpaceImages = async (count = 1) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`/api/images/random-space-images?count=${count}`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomSpaceImages(1); // Fetch one image on component mount
    }, []);

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Random Space Images</h1>

            {loading && <Spinner aria-label="Loading images..." />}

            {error && <Alert color="failure">{error}</Alert>}

            <div className="grid grid-cols-1 gap-4">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className="rounded overflow-hidden shadow-lg">
                            <img
                                src={image.imageUrl}
                                alt={image.altDescription}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{image.altDescription || 'Space Image'}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No images found. Click the button to fetch!</p>
                )}
            </div>

            <div className="text-center mt-4">
                <Button onClick={() => fetchRandomSpaceImages(5)} gradientDuoTone="purpleToBlue">
                    Generate New Images
                </Button>
            </div>
        </div>
    );
}

export default RandomSpaceImages;
