const ScramblePage = async ({ params }: { params: { scrambleId: string } }) => {
  const scrambleId = (await params).scrambleId;
  return (
    <>
      {/* Course Name */}
      {/* Course Overview */}
      {/* Course Main Sponsor */}
      {/* List of Teams - When a person clicks on the team. 
        It goes to the team page with list of members. 
        Starting Hole Number.
        Team has to confirm to start the round.
        On confirmation, the ScrambleTeamId is saved as a cookie and the status in the database is changed to "In Progress".
        What to do if scoring is switched to another user?
        - Does a user have to explain why they are choosing to start over?
        - Does it even matter why?
        */}
    </>
  );
};

export default ScramblePage;
