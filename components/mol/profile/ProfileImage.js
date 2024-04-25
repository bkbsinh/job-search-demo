import { MdCameraAlt } from "react-icons/md";
import uploadProfileImage from "@/lib/actions/uploadProfile";
import ProfileEditForm from "../../atom/profile/ProfileEditForm";

const ProfileImage = ({ img }) => {
  return (
      <div className="relative">
        <img 
          className="max-h-[300px] w-auto rounded-full lg:max-h-[350px] xl:max-h-[420px]"
          src={img} 
        />
        <ProfileEditForm action={uploadProfileImage}>
          <MdCameraAlt className="w-[25px] h-[25px]" />
        </ProfileEditForm>
      </div>
  )
}

export default ProfileImage
