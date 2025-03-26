$(document).ready(function () {
  $(".hero-heading").waypoint(
    function (direction) {
      $(".hero-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".banner-content-container").waypoint(
    function (direction) {
      $(".banner-content-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-2s"
      );
    },
    {
      offset: "80%", 
    }
  );
  $(".creviews-heading").waypoint(
    function (direction) {
      $(".creviews-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".rtext1").waypoint(
    function (direction) {
      $(".rtext1").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".rtext2").waypoint(
    function (direction) {
      $(".rtext2").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".aboutSt1").waypoint(
    function (direction) {
      $(".aboutSt1").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".aboutSt2").waypoint(
    function (direction) {
      $(".aboutSt2").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".abt-story-heading").waypoint(
    function (direction) {
      $(".abt-story-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".flip-heading").waypoint(
    function (direction) {
      $(".flip-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".flip-teams").waypoint(
    function (direction) {
      $(".flip-teams").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".grid").waypoint(
    function (direction) {
      $(".grid").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  
  $(".frm-heading").waypoint(
    function (direction) {
      $(".frm-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $("#signup_form").waypoint(
    function (direction) {
      $("#signup_form").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $("#signup_forms").waypoint(
    function (direction) {
      $("#signup_forms").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  //============================================contact us=======================================================

  $(".contact-content-title").waypoint(
    function (direction) {
      $(".contact-content-title").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".contact-content-text").waypoint(
    function (direction) {
      $(".contact-content-text").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".contact-info").waypoint(
    function (direction) {
      $(".contact-info").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".contact-form-image").waypoint(
    function (direction) {
      $(".contact-form-image").addClass(
        "animate__animated animate__flip animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".contact-map-container").waypoint(
    function (direction) {
      $(".contact-map-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  // ===================================pricing====================================================================
  $(".pricing-content-title").waypoint(
    function (direction) {
      $(".pricing-content-title").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".pricing-content-text").waypoint(
    function (direction) {
      $(".pricing-content-text").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
 
  //===========================================services==========================================================

  $(".dslider-heading").waypoint(
    function (direction) {
      $(".dslider-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".slider").waypoint(
    function (direction) {
      $(".slider").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".service-heading").waypoint(
    function (direction) {
      $(".service-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  $(".service-grid").waypoint(
    function (direction) {
      $(".service-grid").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );

  $(".service-card").each(function (index) {
    var $card = $(this);

    $card.waypoint(
      function (direction) {
        setTimeout(function () {
          $card.addClass("animate__animated animate__fadeInUp");
          $card.css("opacity", "1"); 
        }, index * 300); 
      },
      {
        offset: "50%", 
      }
    );
  });
  $(".f-heading").waypoint(
    function (direction) {
      $(".f-heading").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $("#signup_form").waypoint(
    function (direction) {
      $("#signup_form").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );
  // =========================================index============================================================

  $(".counter-container").waypoint(
    function (direction) {
      $(".counter-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".shop-schedule-container").each(function(index) {
    var $container = $(this);
  
    var delay = index * 300; 
  
    $container.waypoint(
      function(direction) {
        setTimeout(function() {
          $container.addClass(
            "animate__animated animate__fadeInUp animate__duration-1_5s"
          );
        }, delay); 
      },
      {
        offset: "50%", 
      }
    );
  });
  
  $(".about-image-container").waypoint(
    function (direction) {
      $(".about-image-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%",
    }
  );
  $(".about-content-container").waypoint(
    function (direction) {
      $(".about-content-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );

  $(".service-content-container").waypoint(
    function (direction) {
      $(".service-content-container").addClass(
        "animate__animated animate__fadeInUp animate__duration-1_5s"
      );
    },
    {
      offset: "50%", 
    }
  );

 $(".service-card-container").each(function(index) {
  var $container = $(this);
  
  var delay = index * 300; 

  $container.waypoint(
    function(direction) {
      setTimeout(function() {
        $container.addClass("animate__animated animate__fadeInUp animate__duration-1_5s");
      }, delay); 
    },
    {
      offset: "50%",
    }
  );
});

$(".service-card-details").each(function(index) {
  var $card = $(this);
  
  var delay = index * 300;

  $card.waypoint(
    function(direction) {
      setTimeout(function() {
        $card.addClass("animate__animated animate__fadeInUp animate__duration-1_5s");
      }, delay); 
    },
    {
      offset: "50%", 
    }
  );
});


$(".whyBox-content-container").waypoint(
  function (direction) {
    $(".whyBox-content-container").addClass(
      "animate__animated animate__fadeInUp animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);

$(".whyBox-video-container").waypoint(
  function (direction) {
    $(".whyBox-video-container").addClass(
      "animate__animated animate__fadeInUp animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
$(".whyBox-achievement-Box").each(function(index) {
  var $box = $(this);

  var delay = index * 300; 

  $box.waypoint(
    function(direction) {
      setTimeout(function() {
        $box.addClass("animate__animated animate__fadeInDown animate__duration-1_5s");
      }, delay);
    },
    {
      offset: "50%", 
    }
  );
});

$(".testimonial-card-container").each(function(index) {
  var $testimonialCard = $(this);

  var delay = index * 300; 

  $testimonialCard.waypoint(
    function(direction) {
      setTimeout(function() {
        $testimonialCard.addClass("animate__animated animate__fadeInDown animate__duration-1_5s");
      }, delay); 
    },
    {
      offset: "50%", 
    }
  );
});

$(".client-image1").waypoint(
  function (direction) {
    $(".client-image1").addClass(
      "animate__animated animate__fadeInUp animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
$(".client-image2").waypoint(
  function (direction) {
    $(".client-image2").addClass(
      "animate__animated animate__fadeInDown animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
$(".client-content-title").waypoint(
  function (direction) {
    $(".client-content-title").addClass(
      "animate__animated animate__fadeInDown animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
$(".client-content-text").waypoint(
  function (direction) {
    $(".client-content-text").addClass(
      "animate__animated animate__fadeInDown animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
$(".client-rating-container").waypoint(
  function (direction) {
    $(".client-rating-container").addClass(
      "animate__animated animate__fadeInUp animate__duration-1_5s"
    );
  },
  {
    offset: "50%", 
  }
);
  

});

