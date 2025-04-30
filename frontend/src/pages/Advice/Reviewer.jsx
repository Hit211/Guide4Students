import { toast } from "sonner";
import ContactForm from "./ContactForm";
import MentorCard from "./MentorCard";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from "../../redux/mentorSlice";

const Reviewer = ({ service, onSubmit, extraFields }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const dispatch = useDispatch();

  const { mentors, loading } = useSelector((state) => state.mentors);

  useEffect(() => {
    if (mentors.length === 0) {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentors.length]);

  const filteredMentors = mentors.filter((mentor) =>
    mentor.service.includes(service)
  );
  return loading ? (
    <Loader2 />
  ) : filteredMentors.length > 0 ? (
    <div className="flex flex-col gap-4">
      <div className="flex gap-x-2">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor._id}
            onClick={() => {
              if (mentor.available === "Not Available") {
                toast.error("This mentor is not available right now");
                return;
              }
              setSelectedMentor((prev) =>
                prev?._id === mentor._id ? null : mentor
              );
            }}
            className={`flex cursor-pointer transition border w-fit p-2 rounded-md ${
              selectedMentor?._id === mentor._id
                ? "border-2 border-green-500 shadow-lg"
                : "border-gray-300"
            } ${
              mentor.available === "Not Available"
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            <MentorCard mentor={mentor} setViewMore={setViewMore} />
          </div>
        ))}
      </div>
      {selectedMentor && selectedMentor.service.includes(service) ? (
        <ContactForm
          service={service}
          onSubmit={onSubmit}
          extraFields={extraFields}
        />
      ) : (
        <p className="text-lg text-gray-600">
          Please select a mentor to proceed.
        </p>
      )}
      {viewMore && (
        <Profile mentor={viewMore} onclose={() => setViewMore(false)} />
      )}
    </div>
  ) : (
    <h1>No Mentors are available right now</h1>
  );
};

export default Reviewer;
