import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this import

export default function SmoothCollectionForm() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pincode: "",
    quantity: 1,
    waterQuality: "",
    paymentMode: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else {
          handleSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentSlide]);

  const validateField = (field, value) => {
    let isValid = true;
    let errorMessage = "";

    switch (field) {
      case "pincode":
        if (!value.trim()) {
          isValid = false;
          errorMessage = "Pincode is required";
        }
        break;
      case "email":
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          isValid = false;
          errorMessage = "Invalid email address";
        }
        break;
      case "quantity":
        if (value < 1) {
          isValid = false;
          errorMessage = "Water quantity must be at least 1 liter";
        }
        break;
      case "waterQuality":
        if (!value) {
          isValid = false;
          errorMessage = "Please select a water quality option";
        }
        break;
      case "paymentMode":
        if (!value) {
          isValid = false;
          errorMessage = "Please select a payment mode";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleNext = () => {
    const currentSlideData = slides[currentSlide];
    const fieldToValidate = currentSlideData.field;
    const valueToValidate = formData[fieldToValidate];

    if (validateField(fieldToValidate, valueToValidate)) {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    const allFieldsValid = slides.every((slide) =>
      validateField(slide.field, formData[slide.field])
    );

    if (allFieldsValid) {
      try {
        setSubmissionStatus("submitting");
        const response = await axios.post(
          "http://localhost:5000/collection/add",
          formData
        );
        console.log("Collection request submitted:", response.data);
        setSubmissionStatus("success");
      } catch (error) {
        console.error("Error submitting collection request:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
        setSubmissionStatus("error");
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to submit the form. Please try again.",
        }));
      }
    }
  };

  const waterQualityOptions = [
    { value: "potable", label: "Potable" },
    { value: "non-potable", label: "Non-Potable" },
    { value: "distilled", label: "Distilled" },
    { value: "mineral", label: "Mineral" },
    { value: "purified", label: "Purified" },
  ];

  const slides = [
    {
      field: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name (optional)",
    },
    {
      field: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email (optional)",
    },
    {
      field: "pincode",
      label: "Pincode",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      field: "quantity",
      label: "Water Quantity (in liters)",
      type: "number",
      min: 1,
    },
    {
      field: "waterQuality",
      label: "Water Quality",
      type: "radio",
      options: waterQualityOptions,
    },
    {
      field: "paymentMode",
      label: "Payment Mode",
      type: "radio",
      options: [
        { value: "COD", label: "Cash on Delivery" },
        { value: "Online", label: "Online Payment" },
      ],
    },
  ];

  const renderInput = (slide) => {
    switch (slide.type) {
      case "radio":
        return (
          <div className="space-y-2">
            {slide.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={option.value}
                  name={slide.field}
                  value={option.value}
                  checked={formData[slide.field] === option.value}
                  onChange={(e) =>
                    handleInputChange(slide.field, e.target.value)
                  }
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={option.value} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={slide.type}
            placeholder={slide.placeholder}
            value={formData[slide.field]}
            onChange={(e) => handleInputChange(slide.field, e.target.value)}
            min={slide.min}
            className={`w-full p-2 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 ${
              errors[slide.field] ? "border-red-500" : ""
            }`}
            required={slide.field !== "name" && slide.field !== "email"}
          />
        );
    }
  };

  return (
    <div
      className="flex justify-center items-center p-0 bg-transparent"
      style={{ height: "435px" }}
    >
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        style={{ height: "435px" }}
      >
        <div className="p-6 flex flex-col justify-between h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Water Collection Form
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="mb-4 flex-grow">
            <label className="block text-base font-medium text-gray-700 mb-2">
              {slides[currentSlide].label}
            </label>
            {renderInput(slides[currentSlide])}
            {errors[slides[currentSlide].field] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[slides[currentSlide].field]}
              </p>
            )}
          </div>

          {submissionStatus === "success" && (
            <p className="text-green-500 text-sm mb-2">
              Form submitted successfully!
            </p>
          )}
          {submissionStatus === "error" && (
            <p className="text-red-500 text-sm mb-2">{errors.submit}</p>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all duration-300 ease-in-out"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={submissionStatus === "submitting"}
              className="px-4 py-2 text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {currentSlide === slides.length - 1
                ? submissionStatus === "submitting"
                  ? "Submitting..."
                  : "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
