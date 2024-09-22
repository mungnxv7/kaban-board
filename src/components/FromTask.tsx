import { ChangeEvent, useEffect, useState } from "react";
import { FormCard, ICardItem } from "../types";
import "animate.css";

interface Props {
  dataCard: ICardItem | null;
  submit: (data: FormCard) => void;
}

const FromTask = ({ dataCard, submit }: Props) => {
  const [form, setForm] = useState<FormCard>({
    title: "",
    priority: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (dataCard) {
      setForm({
        title: dataCard.title,
        priority: dataCard?.priority ?? "",
        description: dataCard?.description ?? "",
        endDate: dataCard?.endDate ?? "",
        startDate: dataCard.startDate ?? "",
      });
    }
  }, [dataCard]);

  const onChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    if (!form.title) {
      console.log("Please enter field name card");
      return;
    }
    submit(form);
  };

  return (
    <div className="w-1/3 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-slate-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 animate__zoomIn animate__slower">
      <div>
        <h1 className="text-2xl font-semibold">
          {dataCard ? `Update Card` : "Add new card"}
        </h1>
      </div>
      <div className="flex gap-5">
        <div className="mt-8 w-2/3 flex-1">
          <label htmlFor="">
            <p>Name card</p>
            <input
              onChange={onChangeField}
              value={form.title}
              type="text"
              name="title"
              className="w-full rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500 mt-1"
            />
          </label>
        </div>
        <div className="mt-8 w-1/4">
          <label htmlFor="">
            <p>Priority</p>
            <select
              name="priority"
              onChange={onChangeField}
              className="w-full rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500 mt-1"
            >
              <option hidden value={form.priority}>
                Choose
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mt-3 flex gap-5">
        <div className="w-1/2">
          <label htmlFor="">
            <p>Start date</p>
            <input
              onChange={onChangeField}
              type="date"
              name="startDate"
              value={form.startDate}
              className="w-full rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500 mt-1"
            />
          </label>
        </div>
        <div className="w-1/2">
          <label htmlFor="">
            <p>End date</p>
            <input
              onChange={onChangeField}
              type="date"
              name="endDate"
              value={form.endDate}
              className="w-full rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500 mt-1"
            />
          </label>
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="">
          <p>Description</p>
          <textarea
            rows={4}
            onChange={onChangeField}
            className="w-full rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500 mt-1"
            name="description"
            value={form.description}
          ></textarea>
        </label>
      </div>
      <div className="text-end mt-3">
        <button
          onClick={onSubmit}
          className="py-2 px-5 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FromTask;
