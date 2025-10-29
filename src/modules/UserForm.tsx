import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { designations, skillOptions } from "@/utils/constant";
import DateInput from "@/components/DateInput";
import Select, { type MultiValue, type SingleValue } from "react-select";
import { TrashIcon } from "lucide-react";
import { useAppReducer } from "@/hooks/useAppReducer";
import type { TUser } from "@/types";
import { useEffect } from "react";
// import "./UserForm.css";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters.",
  }),
});

type TForm = z.infer<typeof formSchema>;

export function UserForm() {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });
  const { state, actions } = useAppReducer();

  // image upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    console.log(file);
    console.log("File Substring: ", file.type.substring(0, 5));
    if (file && file.type.substring(0, 5) === "image") {
      actions.handleImageUpload(file);
    }
  };

  // form submission
  const onSubmit = async (data: TForm) => {
    const newUser: TUser = {
      id: state.userData.length + 1,
      ...data,
      dob: state.dob,
      gender: state.gender,
      designation: state.designation,
      skills: state.skills,
      image: state.imagePreview,
    };
    actions.setUserData([...state.userData, newUser])
  };

  useEffect(() => {
    if (state.userData) {
      console.log("From UserForm", state.userData);
    }
  }, [state.userData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* name and email field */}
        <div className="flex justify-between items-top gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs"
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs"
                    placeholder="Your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* dob, gender and designation field */}
        <div className="space-y-4 md:space-y-0 md:flex justify-between items-start gap-4">
          {/* date picker */}
          <div className="grow items-start">
            <DateInput
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   actions.setDob((e?.target as HTMLInputElement).value);
            // }}
            // value={state.dob?.toString().split("T")[0]}
            />
          </div>
          {/* gender */}
          <div className="grow items-start">
            <Label className="mb-4">Gender</Label>
            <RadioGroup className="flex items-center" defaultValue="male">
              {["male", "female"].map((gender, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem
                    onChange={(e) =>
                      actions.setGender((e?.target as HTMLInputElement).value)
                    }
                    value={gender}
                    id={gender}
                  />
                  <Label htmlFor="option-one" className="capitalize">
                    {gender}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* select */}
          <div className="grow">
            <Label className="mb-2">Designation</Label>
            <Select
              options={designations}
              onChange={(
                d: SingleValue<{
                  value: string;
                  label: string;
                }>
              ) => {
                actions.setDesignation(d?.value as string);
              }}
            />
          </div>
        </div>
        {/* skills field */}
        <div className="">
          <Label className="mb-2">Skills</Label>
          <Select
            defaultValue={[skillOptions[1], skillOptions[2]]}
            isMulti
            name="skills"
            options={skillOptions}
            onChange={(
              s: MultiValue<{
                value: string;
                label: string;
              }>
            ) => {
              const selectedSkills = s.map((v) => v.value);
              actions.setSkills(selectedSkills as string[]);
            }}
            // className="custom-select"
            classNamePrefix="select"
          />
        </div>
        {/* bio field */}
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xs"
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* image field */}
        <div className="flex justify-between items-center gap-4">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="picture">Upload Your Photo</Label>
            <Input
              onChange={handleImage}
              accept="image/*"
              id="picture"
              type="file"
              className="cursor-pointer"
            />
            {state.imagePreview && (
              <div className="flex items-start mt-5 gap-2">
                <div className="w-[150px] h-[150px]">
                  {state.imagePreview && (
                    <img src={state.imagePreview} alt="Preview" />
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    actions.setImagePreview("");
                  }}
                  size="sm"
                  className="active:scale-95 rounded text-rose-600 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* error message */}
        <div>
          {state.error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {state.error}
            </div>
          )}
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
