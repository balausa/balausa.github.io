export const formatUserData = (user: any) => {
    return {
      fullName: `${user?.name?.first} ${user?.name?.last}`,
      age: user?.dob?.age,
      gender: user?.gender,
      email: user?.email,
      phone: user?.phone,
      // address: `${user?.location?.street?.number} ${user?.location?.street?.name}, ${user?.location?.city}, ${user?.location?.state}, ${user?.location?.country}`,
    };
  };
  