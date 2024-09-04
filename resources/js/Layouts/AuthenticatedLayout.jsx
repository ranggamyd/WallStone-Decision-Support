import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import {
  BrickWall,
  Calculator,
  ChartCandlestick,
  ChevronDown,
  DraftingCompass,
  FileBox,
  FileDigit,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings2,
  User,
  UserCircle,
  UserPen,
  UsersRound,
} from "lucide-react";

export default function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href={route("dashboard")}>
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  <PieChart className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
                <div className="flex items-center">
                  <Dropdown className="flex items-center">
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Master Data
                          <ChevronDown
                            className="h-3 w-3 ms-2 -me-2"
                            strokeWidth={3}
                          />
                        </button>
                      </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                      <Dropdown.Link
                        className="flex items-center"
                        href={route("products")}
                      >
                        <BrickWall className="w-3 h-3 mr-3" />
                        Produk
                      </Dropdown.Link>
                      <Dropdown.Link
                        className="flex items-center"
                        href={route("alternatives")}
                      >
                        <FileBox className="w-3 h-3 mr-3" />
                        Alternatif
                      </Dropdown.Link>
                      <Dropdown.Link
                        className="flex items-center"
                        href={route("criterias")}
                      >
                        <ChartCandlestick className="w-3 h-3 mr-3" />
                        Kriteria
                      </Dropdown.Link>
                      <Dropdown.Link
                        className="flex items-center"
                        href={route("subcriterias")}
                      >
                        <Settings2 className="w-3 h-3 mr-3" />
                        Sub Kriteria
                      </Dropdown.Link>
                      <Dropdown.Link
                        className="flex items-center"
                        href={route("users")}
                      >
                        <UsersRound className="w-3 h-3 mr-3" />
                        Daftar Pengguna
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
                <NavLink
                  href={route("scores")}
                  active={route().current("scores")}
                >
                  <DraftingCompass className="w-4 h-4 mr-2" />
                  Penilaian Alternatif
                </NavLink>
                <NavLink
                  href={route("scores.calculation")}
                  active={route().current("scores.calculation")}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Perhitungan
                </NavLink>
                <NavLink
                  href={route("scores.final")}
                  active={route().current("scores.final")}
                >
                  <FileDigit className="w-4 h-4 mr-2" />
                  Hasil Akhir
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user.username}
                        <ChevronDown
                          className="h-3 w-3 ms-2 -me-2"
                          strokeWidth={3}
                        />
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link
                      className="flex items-center"
                      href={route("profile.edit")}
                    >
                      <UserPen className="w-3 h-3 mr-3" />
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      className="flex items-center"
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      <LogOut className="w-3 h-3 mr-3" />
                      Log out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              className="flex items-center"
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              <PieChart className="w-3 h-3 mr-3" />
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("products")}
              active={route().current("products")}
            >
              <BrickWall className="w-3 h-3 mr-3" />
              Produk
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("alternatives")}
              active={route().current("alternatives")}
            >
              <FileBox className="w-3 h-3 mr-3" />
              Alternatif
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("criterias")}
              active={route().current("criterias")}
            >
              <ChartCandlestick className="w-3 h-3 mr-3" />
              Kriteria
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("subcriterias")}
              active={route().current("subcriterias")}
            >
              <Settings2 className="w-3 h-3 mr-3" />
              Sub Kriteria
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("users")}
              active={route().current("users")}
            >
              <UsersRound className="w-3 h-3 mr-3" />
              Daftar Pengguna
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("scores")}
              active={route().current("scores")}
            >
              <DraftingCompass className="w-3 h-3 mr-3" />
              Penilaian Alternatif
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("scores.calculation")}
              active={route().current("scores.calculation")}
            >
              <Calculator className="w-3 h-3 mr-3" />
              Perhitungan
            </ResponsiveNavLink>
            <ResponsiveNavLink
              className="flex items-center"
              href={route("scores.final")}
              active={route().current("scores.final")}
            >
              <FileDigit className="w-3 h-3 mr-3" />
              Hasil Akhir
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4 flex items-center">
              <UserCircle className="w-3 h-3 mr-3 text-gray-600" />
              <div>
                <div className="font-medium text-base text-gray-800">
                  {user.username}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink
                className="flex items-center"
                href={route("profile.edit")}
              >
                <UserPen className="w-3 h-3 mr-3" />
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                className="flex items-center"
                method="post"
                href={route("logout")}
                as="button"
              >
                <LogOut className="w-3 h-3 mr-3" />
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
