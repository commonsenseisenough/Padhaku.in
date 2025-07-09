import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  // ‼️  Give RHF initial values so you don't need the extra useEffect
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseExperience: "",
      courseRating: 0,
    },
  });

  // If you ever need to reset the form when the modal opens
  useEffect(() => {
    reset({
      courseExperience: "",
      courseRating: 0,
    });
  }, [reset]);

  const onSubmit = async (data) => {
    console.log("🚀 onSubmit called with:", data);
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black/30 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-300 bg-white shadow-xl">
        {/* ---------- Header ---------- */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-100 p-5">
          <p className="text-xl font-semibold text-gray-800">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-gray-700 hover:text-red-500" />
          </button>
        </div>

        {/* ---------- Body ---------- */}
        <div className="p-6">
          {/* Avatar + name */}
          <div className="mb-4 flex items-center gap-x-4">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="h-[50px] w-[50px] rounded-full border object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">Posting Publicly</p>
            </div>
          </div>

          {/* ---------- Form ---------- */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            {/* Rating */}
            <Controller
              name="courseRating"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <ReactStars
                  {...field}
                  count={5}
                  size={28}
                  activeColor="#facc15"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.courseRating && (
              <span className="mt-1 text-sm text-red-500">
                Please give a rating
              </span>
            )}

            {/* Review text */}
            <div className="mt-6 flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="courseExperience"
                className="text-sm text-gray-700"
              >
                Add Your Experience <sup className="text-red-500">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add your experience..."
                {...register("courseExperience", { required: true })}
                className="min-h-[130px] w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.courseExperience && (
                <span className="text-sm text-red-500">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
