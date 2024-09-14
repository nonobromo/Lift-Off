import Logo from "../components/logo";
import PageHeader from "../components/common/pageHeader";
import { useTheme } from "next-themes";

function About() {
  const { theme } = useTheme();

  return (
    <div
      className={`container ${
        theme === "dark" ? "bg-dark" : "bg-secondary-subtle"
      } p-3`}
    >
      <PageHeader
        title={
          <>
            About <Logo />
          </>
        }
        description="First of all, Welcome to Lift Off!"
      />
      <p>
        We here in Lift Off can help you either find the right business for you,
        or publish your own for better wanted traffic.
      </p>
      <h2 className="text-center">What Are We Offering?</h2>
      <ul className="list-group">
        <li className="list-group-item">
          Browse for businesses of your intrest.
        </li>
        <li className="list-group-item">
          As a business account, You can create you own business cards for
          others to look at. Edit them, And Delete one if needed.
        </li>
        <li className="list-group-item">
          You can always edit your personal info we needed. Click the
        </li>
      </ul>
      <div>
        <h3 className="text-center">Contact Us!</h3>
        <ul>
          <li>
            Email: liftoff@email.com <i className="bi bi-envelope"></i>
          </li>
          <li>
            Phone: 050-012-345 <i className="bi bi-telephone-fill"></i>
          </li>
          <li>
            Address: Downtown Battle Mountain Haifa 17{" "}
            <i className="bi bi-geo-alt"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
