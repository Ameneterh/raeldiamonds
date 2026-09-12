import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import {
  MdOutlineCreateNewFolder,
  MdAddBusiness,
  MdOutlineContentPasteGo,
} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbMessage } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button, Sidebar } from "flowbite-react";
import Divider from "./Divider";

export default function DashSidebar() {
  const navigate = useNavigate();
  const { error, isLoading, logout, user } = useAuthStore();

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
      toast.success("You have logged out!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="min-h-screen w-full">
    <Sidebar className="w-full bg-transparent sm:min-h-screen flex flex-col justify-between text-gray-800">
      <Sidebar.Items className="mb-5">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {user && (
            <>
              <Link to="/user-dashboard?tab=dash">
                <Sidebar.Item
                  active={tab === "dash" || !tab}
                  icon={HiChartPie}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=profile">
                <Sidebar.Item
                  active={tab === "profile"}
                  icon={HiUser}
                  label={user.isAdmin ? "Admin" : "Client"}
                  labelColor="dark"
                  as="div"
                >
                  Profile
                </Sidebar.Item>
              </Link>
              {/* <Link to="/user-dashboard?tab=invoices">
                <Sidebar.Item
                  active={tab === "invoices"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Invoices
                </Sidebar.Item>
              </Link> */}
              {/* <Link to="/user-dashboard?tab=clients">
                <Sidebar.Item
                  active={tab === "clients"}
                  icon={TbMessage}
                  as="div"
                >
                  Clients
                </Sidebar.Item>
              </Link> */}
            </>
          )}

          {user.isAdmin ||
            (user.role === "architect" && (
              <>
                <Link to="/user-dashboard?tab=users">
                  <Sidebar.Item
                    active={tab === "users"}
                    icon={HiOutlineUserGroup}
                    as="div"
                  >
                    Users
                  </Sidebar.Item>
                </Link>
                {/* <Link to="/user-dashboard?tab=businesses">
                  <Sidebar.Item
                    active={tab === "businesses"}
                    icon={HiAnnotation}
                    as="div"
                  >
                    Businesses
                  </Sidebar.Item>
                </Link> */}

                <Link to="/user-dashboard?tab=add-category">
                  <Sidebar.Item
                    icon={MdOutlineContentPasteGo}
                    as="div"
                    className="text-nowrap"
                  >
                    Add Category
                  </Sidebar.Item>
                </Link>
                <Link to="/user-dashboard?tab=add-product">
                  <Sidebar.Item
                    icon={AiOutlineProduct}
                    as="div"
                    className="text-nowrap"
                  >
                    Add Product
                  </Sidebar.Item>
                </Link>
              </>
            ))}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    // </div>
  );
}
