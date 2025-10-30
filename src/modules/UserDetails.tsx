import { useAppContext } from "@/provider/AppProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, User, Briefcase, FileText } from "lucide-react";
import { getInitials } from "@/utils/getInitials";

export type TUser = {
  id?: number;
  name: string;
  email: string;
  dob: string;
  gender: string;
  designation: string;
  bio: string;
  skills: string[];
  image: string;
};

export default function UserDetails() {
  const { state, contentRef } = useAppContext();

  console.log(contentRef)

  const user = state.selectedUser;

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <User className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Select a user to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format date of birth
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div ref={contentRef}>
        <Card className="w-full max-w-2xl mx-auto my-20">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <p className="text-muted-foreground flex items-center justify-center gap-2 mt-2">
              <Briefcase className="h-4 w-4" />
              {user.designation}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="font-medium">{formatDate(user.dob)}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Gender</p>
                <p className="font-medium capitalize">{user.gender}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                About
              </h3>
              <div className="p-4 rounded-lg border bg-muted/50">
                <p className="text-sm leading-relaxed">{user.bio}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
