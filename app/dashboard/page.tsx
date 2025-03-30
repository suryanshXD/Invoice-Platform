import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashBoard() {
  const session = await requireUser();
  return (
    <>
      <div>From Dashboard</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="cursor-pointer" type="submit">
          Sign Out
        </button>
      </form>
    </>
  );
}
