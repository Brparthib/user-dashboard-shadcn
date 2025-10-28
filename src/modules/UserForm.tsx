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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function UserForm() {
  const form = useForm();

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
        <div className="flex justify-between items-start gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Date of birth</FormLabel>
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
          {/* gender */}
          <div className="grow items-start">
            <Label className="mt-1 mb-4">Gender</Label>
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
            <Label className="mt-1 mb-2">Designation</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* skills field */}
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Skills</FormLabel>
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Upload Image</FormLabel>
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
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button type="submit" variant="outline" className="">
            Clear Form
          </Button>
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
