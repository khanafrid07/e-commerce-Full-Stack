import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { notifyError } from "../../../utils/notify";

export default function ImageUploader({ maxImages = 5, form, setDeleteImages, deleteImages, setForm, idx, optional = false }) {

    const inputRef = useRef();
    const images = form?.images || form?.[idx]?.images || [];

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = images.length + files.length;

        if (totalImages > maxImages) {
            notifyError(`You can upload maximum ${maxImages} images`);
            return;
        }
        if (!optional) {
            const newImages = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
                isMain: false
            }));

            const updatedImages = [...images, ...newImages];

            setForm({ ...form, images: updatedImages });

        } else {
            const newImages = files.map((file, i) => ({
                file,
                url: URL.createObjectURL(file),
            }));

            const updatedImages = [...images, ...newImages];
            setForm((prev) => {
                const updated = [...prev];
                updated[idx] = { ...updated[idx], images: updatedImages };
                return updated;
            });
        }
    };

    const removeImage = (index) => {
        const updated = images.filter((_, i) => i !== index);

        if (!optional) {
            setForm({ ...form, images: updated });
            URL.revokeObjectURL(images.url);
            if (images[index].url) {
                setDeleteImages((prev) => [...prev, images[index].url]);
            }
        } else {

            setForm((prev) => {
                const updatedForm = [...prev];
                updatedForm[idx] = {
                    ...updatedForm[idx],
                    images: updated
                };
                URL.revokeObjectURL(images[index].url);
                return updatedForm;
            });
        }
    };

    return (
        <div className="space-y-2">
            <span className="font-semibold text-xl">Product Images</span>{" "}
            (max upto {maxImages} images) {optional && "(optional)"}

            {/* Hidden file input */}
            <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFiles}
            />

            {/* Upload box */}
            <div
                onClick={() => inputRef.current.click()}
                className="h-64 flex justify-center items-center mt-12 flex-col border-2  border-dashed rounded-lg cursor-pointer hover:border-gray-400"
            >
                {images.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                        <Plus size={24} />
                        <p>Main Image</p>
                    </div>
                ) : (
                    <img src={images[0].url} alt="product" className="w-full h-full object-cover rounded-lg" />
                )}
            </div>

            {/* Images grid */}
            <div className="grid grid-cols-5 gap-2 mt-2">
                {[...Array(maxImages)].map((_, i) => {
                    const img = images[i];
                    return (

                        <div
                            key={i}
                            onClick={() => inputRef.current.click()}
                            className="relative w-full h-16 border rounded-md flex justify-center items-center overflow-hidden"
                        >
                            {img ? (
                                <>
                                    <img
                                        src={img.url}
                                        alt="product"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            return removeImage(i)
                                        }}
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <Plus />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}