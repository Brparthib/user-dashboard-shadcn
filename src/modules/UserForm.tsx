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
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { TrashIcon } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function UserForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const form = useForm();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!uploadedFile) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(uploadedFile);
    console.log(objectURL);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [uploadedFile]);

  // image upload
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setUploadedFile(undefined);
      return;
    }

    const file = event.target.files[0];
    console.log(file);
    console.log("File Substring: ", file.type.substring(0, 5));
    setUploadedFile(file);
  };

  // form submission
  const onSubmit = () => {
    console.log("Thank You!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* name and email field */}
        <div className="flex justify-between items-top gap-4">
          <FormField
            control={form.control}
            name="username"
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
            {/* <Label className="mt-1 mb-4">Date of birth</Label> */}
            <DateInput />
          </div>
          {/* gender */}
          <div className="grow items-start">
            <Label className="mb-4">Gender</Label>
            <RadioGroup className="flex items-center" defaultValue="male">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="option-one" />
                <Label htmlFor="option-one">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="option-two" />
                <Label htmlFor="option-two">Female</Label>
              </div>
            </RadioGroup>
          </div>
          {/* select */}
          <div className="grow">
            <Label className="mb-2">Designation</Label>
            <Select options={designations} />
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
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* bio field */}
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="username"
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
              ref={fileInput}
              className="cursor-pointer"
            />
            {uploadedFile && (
              <div className="flex items-start mt-5 gap-2">
                <div className="w-[150px] h-[150px]">
                  {preview && <img src={preview} alt="Preview" />}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedFile(undefined);
                    if (fileInput.current) {
                      fileInput.current.value = "";
                    }
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
        <div className="flex justify-end items-center gap-2">
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
