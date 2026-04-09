import { useState, useEffect } from "react";
import BannerRenderer from "./BannerRenderer";
import BannerFormFields from "./BannerFormFields";
import { useParams } from "react-router-dom";
import { useGetBannerByIdQuery, useCreateBannerMutation, useUpdateBannerMutation } from "./BannerSlice";
import BannerScheduler from "./BannerSchedule";

export default function BannerForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data, isLoading } = useGetBannerByIdQuery(id, {
    skip: !id,
  });
  console.log("edit banner", data)
  const [createBanner] = useCreateBannerMutation()
  const [updateBanner] = useUpdateBannerMutation()
  const [form, setForm] = useState({
    title: "",
    heading: "",
    subHeading: "",
    image: "",
    ctaText: "",
    ctaLink: "",
    template: "hero_dark",
    placement: "home_top",
    type: "promo",
    category: "",
    schedule: { startDate: undefined, endDate: undefined },
    isActive: true,
    preview: null
  });

  console.log(form, "form")

  useEffect(() => {
    if (data) {
      const b = data;

      setForm({
        title: b.title || "",
        subHeading: b.subHeading || "",
        heading: b.heading || "",
        image: b.image || "",
        ctaText: b.ctaText || "",
        ctaLink: b.ctaLink || "",
        template: b.template || "hero_dark",
        placement: b.placement || "home_top",
        type: b.type || "promo",
        category: b.category || "",
        isActive: b.isActive ?? true,
        preview: null,
        schedule: b.schedule ?? {startDate: undefined, endDate:undefined}
      });
    }
  }, [data]);
  useEffect(() => {
    if (!form.preview) return;


    return () => {
      URL.revokeObjectURL(form.preview);

    };
  }, [form.preview]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageUpload(file) {
    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  }
function handleScheduleChange(e){
  setForm((prev)=>({
    ...prev, schedule:{...prev.schedule, [e.target.name]:e.target.value}
  }))
}

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("heading", form.heading);
    formData.append("subHeading", form.subHeading);
    formData.append("ctaText", form.ctaText);
    formData.append("ctaLink", form.ctaLink);
    formData.append("template", form.template);
    formData.append("placement", form.placement);
    formData.append("type", form.type);
    formData.append("category", form.category);
    formData.append("isActive", form.isActive);
    formData.append("schedule", JSON.stringify(form.schedule));


    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    if (isEdit) {
      try {
        await updateBanner({ id, formData }).unwrap()
        alert("banner updated success")

      } catch (err) {
        alert("error updating banner", err)
        console.log(err)
      }
    } else {
      try {

        await createBanner(formData).unwrap()
        alert("Banner created success")
      } catch (err) {
        alert("error creating banner")
        console.log(err)
      }
    }

    console.log(formData)
  }
  if(isLoading) return<p>Loading</p>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {/* LEFT: FORM */}
      <BannerFormFields
        form={form}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        isLoading={isLoading}
      />


      <div className="sticky top-6 space-y-3">
        <h2 className="text-lg font-semibold">Live Preview</h2>

        <div className="rounded-2xl   overflow-hidden border bg-base-200">
          <BannerRenderer
            banner={{
              ...form,
              image:
                form.preview || form.image ||
                "https://via.placeholder.com/1200x600?text=Preview",
            }}
          />
        </div>
        <div>
          <BannerScheduler form={form} handleChange={handleScheduleChange} />

        </div>
      </div>
    </div>
  );
}