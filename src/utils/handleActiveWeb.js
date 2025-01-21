import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "jquery.easing";
import "bootstrap/dist/js/bootstrap.bundle.min";

function handleActiveWeb() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Handle Toggle sidebar
    const handleSidebarToggle = () => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    };

    // Handle resize window
    const handleWindowResize = () => {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }

      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $(".sidebar .collapse").collapse("hide");
      }
    };

    // Handle scroll show/off
    const handleScroll = () => {
      const scrollDistance = $(document).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    };

    // Handle smooth scroll
    const handleSmoothScroll = (e) => {
      const $anchor = $(e.currentTarget);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    };

    // Add event when component mount
    $("#sidebarToggle, #sidebarToggleTop").on("click", handleSidebarToggle);
    $(window).on("resize", handleWindowResize);
    $(document).on("scroll", handleScroll);
    $(document).on("click", "a.scroll-to-top", handleSmoothScroll);

    // Cleanup unmount
    return () => {
      $("#sidebarToggle, #sidebarToggleTop").off("click", handleSidebarToggle);
      $(window).off("resize", handleWindowResize);
      $(document).off("scroll", handleScroll);
      $(document).off("click", "a.scroll-to-top", handleSmoothScroll);
    };
  }, [location]);
  return <></>;
}

export default handleActiveWeb;
