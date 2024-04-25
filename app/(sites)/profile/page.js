import ProfileContainer from "@/components/organ/ProfileContainer";
import ProfileImage from "@/components/mol/profile/ProfileImage";
import ProfileResume from "@/components/mol/profile/ProfileResume";
import fetchUserData from "@/lib/actions/fetchUser";

async function Profile() {
  const user = await fetchUserData();
  console.log(user)
  const userImg = user.profile === "default.avif" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user.profile}`:
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user.id}/${user.profile}`;

  return (
    <ProfileContainer>
      {user?(
        <>
          <ProfileImage img={userImg} />
          <ProfileResume user={user} />
        </>
      ) :
        "Could not loaod user profile"
      
      }
    </ProfileContainer>

  )
}

export default Profile
