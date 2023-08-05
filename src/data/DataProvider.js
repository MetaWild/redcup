import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import DataContext from "./data-context";

function useDidMount() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
}

let DUMMY_DATA = [
  {
    city: "Salt Lake City",
    id: "c1",
    universities: [
      {
        university: "University of Utah",
        logo: "../../images/Saltlakecity_Images/University_Utah_Logo_png.png",
        id: "u1",
        fraternities: [
          {
            address: "1431 E 100 S, Salt Lake City, UT 84102",
            count: 0,
            description:
              "Pi Kappa Alpha Fraternity. Tonight is day 1 of rush week.",
            googleLocation:
              "https://www.google.com/maps/place/Pi+Kappa+Alpha,+Alpha+Tau/@40.7673261,-111.8519841,17z/data=!3m1!4b1!4m6!3m5!1s0x87525f543729aeff:0x924d924d0b1ad10b!8m2!3d40.7673221!4d-111.8497954!16s%2Fg%2F1yglpdrcr",
            host: "Pi Kappa Alpha",
            id: "f1",
            location:
              "https://maps.apple.com/?address=1431%20E%20100%20S,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=15196223798577281185&ll=40.767263,-111.849778&lsp=9902&q=Pi%20Kappa%20Alpha%20Fraternity",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Pi_Kappa_Alpha.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Pi_Kappa_Alpha_Event.jpg",
          },
          {
            address: "1395 E 100 S, Salt Lake City, UT 84102",
            count: 0,
            description:
              "Sigma Chi Fraternity. Tonight we area having a white lies party.",
            googleLocation:
              "https://www.google.com/maps/place/Sigma+Chi+Fraternity/@40.7672361,-111.8529819,17z/data=!3m1!4b1!4m6!3m5!1s0x87525f8eb5daf437:0xef0201c5ab5439c2!8m2!3d40.7672321!4d-111.8507932!16s%2Fg%2F1tddb9zv",
            host: "Sigma Chi",
            id: "f2",
            location:
              "https://maps.apple.com/?address=1395%20E%20100%20S,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=764139936496743631&ll=40.767256,-111.850803&lsp=9902&q=Sigma%20Chi%20at%20the%20University%20of%20Utah",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Sigma_Chi.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Sigma_Chi_Event.jpeg",
          },
          {
            address: "south, 85 S Wolcott St, Salt Lake City, UT 84102",
            count: 0,
            description:
              "Phi Delta Theta Fraternity. Tonight is the 80's theme party.",
            googleLocation:
              "https://www.google.com/maps/place/Phi+Delta+Theta+Utah+Alpha/@40.7675709,-111.8509623,17z/data=!4m6!3m5!1s0x87525f8e8d305453:0x95c042831218ae6f!8m2!3d40.7675669!4d-111.8487736!16s%2Fg%2F11b7gn_yrm",
            host: "Phi Delta Theta",
            id: "f3",
            location:
              "https://maps.apple.com/?address=85%20S%20Wolcott%20St,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=1114313167386166065&ll=40.767554,-111.848604&lsp=9902&q=Phi%20Delta%20Theta%20Fraternity-%20University%20of%20Utah",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Phi_Delta_Theta.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Phi_Delta_Theta_Event.jpg",
          },
          {
            address: "70 S Wolcott St, Salt Lake City, UT 84102",
            count: 0,
            description: "Tonight is day 1 of rush week, Basketball 3v3 4-6pm.",
            googleLocation:
              "https://www.google.com/maps/place/Beta+Theta+Pi/@40.7678321,-111.8514624,17z/data=!3m1!4b1!4m6!3m5!1s0x87525f8ee8115689:0xc02759c60d1bb2b5!8m2!3d40.7678281!4d-111.8492737!16s%2Fg%2F11bx9vnkbf",
            host: "Beta Theta Pi",
            id: "f4",
            location:
              "https://maps.apple.com/?address=70%20S%20Wolcott%20St,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=2203336712758493081&ll=40.767795,-111.849188&lsp=9902&q=Beta%20Theta%20PI",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Beta_Theta_Pi.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Beta_Theta_Pi_Event.jpg",
          },
          {
            address: "41 S University St, Salt Lake City, UT 84102",
            count: 0,
            description: "Kappa Sigma Fraternity!",
            googleLocation: "",
            host: "Kappa Sigma",
            id: "f5",
            location:
              "https://maps.apple.com/?address=41%20S%20University%20St,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=12425542598947032209&ll=40.768637,-111.852182&lsp=9902&q=Kappa%20Sigma%20at%20The%20University%20of%20Utah",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Kappa_Sigma.png",
            poster: "../../images/Saltlakecity_Images/Events/",
          },
          {
            address: "95 S Wolcott St, Salt Lake City, UT 84102",
            count: 0,
            description: "Sigma Nu Fraternity!",
            googleLocation:
              "https://www.google.com/maps/place/Sigma+Nu+Fraternity/@40.7672353,-111.850921,17z/data=!3m1!4b1!4m6!3m5!1s0x87525f8e91f7e6f9:0x6b1799c66d2ac03f!8m2!3d40.7672313!4d-111.8487323!16s%2Fg%2F11b6_v8zd_",
            host: "Sigma Nu",
            id: "f6",
            location:
              "https://maps.apple.com/?address=95%20S%20Wolcott%20St,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=17976022728608732998&ll=40.767201,-111.848694&lsp=9902&q=Sigma%20Nu%20Fraternity",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Sigma_Nu.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Sigma_Nu_Event.jpg",
          },
          {
            address: "74 S Wolcott St, Salt Lake City, UT 84102",
            count: 0,
            description: "Sigma Phi Epsilon!",
            googleLocation:
              "https://www.google.com/maps/place/Sigma+Phi+Epsilon+Fraternity/@40.7676067,-111.8514382,17z/data=!3m1!4b1!4m6!3m5!1s0x87525f8eea5aa5fb:0x1a42ab6c0500718f!8m2!3d40.7676027!4d-111.8492495!16s%2Fg%2F1s048spkl",
            host: "Sigma Phi Epsilon",
            id: "f7",
            location:
              "https://maps.apple.com/?address=74%20S%20Wolcott%20St,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=6574347017010448377&ll=40.767606,-111.849408&lsp=9902&q=Sigma%20Phi%20Epsilon",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Sigma_Phi_Epsilon.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Sigma_Phi_Epsilon_Event.jpg",
          },
          {
            address: "",
            count: 0,
            description: "Alpha Tau Omega Fraternity!",
            googleLocation: "",
            host: "Alpha Tau Omega",
            id: "f8",
            location: "",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Alpha_Tau_Omega.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Alpha_Tau_Omega_Event.jpg",
          },
          {
            address: "",
            count: 0,
            description: "Fraternity",
            googleLocation: "",
            host: "Omega Delta Phi",
            id: "f9",
            location: "",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Omega_Delta_Phi.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Omega_Delta_Phi_Event.jpg",
          },
          {
            address: "",
            count: 0,
            description: "Delta Sigma Phi Fraternity",
            googleLocation: "",
            host: "Delta Sigma Phi",
            id: "f10",
            location: "",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Delta_Sigma_Phi.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Delta_Sigma_Phi_Event.jpg",
          },
          {
            address: "",
            count: 0,
            description: "Pi Kappa Phi Fraternity!",
            googleLocation: "",
            host: "Pi Kappa Phi",
            id: "f11",
            location: "",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Pi_Kappa_Phi.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Pi_Kappa_Phi_Event.jpg",
          },
          {
            address: "",
            count: 0,
            description: "Triangle Fraternity",
            googleLocation: "",
            host: "Triangle",
            id: "f12",
            location: "",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Triangle.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Triangle_Event.jpg",
          },
        ],
        schoolOrganizations: [
          {
            address: "200 Central Campus Dr, Salt Lake City, UT 84112",
            count: 0,
            description:
              "ASUU presents: the Grand Kerfuffle feat. Bleachers and Omar Apollo!",
            googleLocation: "https://goo.gl/maps/geokjrrWQUrdWscq9",
            host: "ASUU",
            id: "s1",
            location:
              "https://maps.apple.com/?ll=40.762226,-111.838938&q=University%20Of%20Utah%20%E2%80%94%20Salt%20Lake%20City&spn=0.007685,0.011383&t=m",
            logo: "../../images/Saltlakecity_Images/Company_Logos/ASSU.png",
            poster: "../../images/Saltlakecity_Images/Events/ASUU_Event.jpg",
          },
          {
            address: "451 1400 E, Salt Lake City, UT 84112",
            count: 0,
            description:
              "Utah Athletics! Check out the poster to see all events!",
            googleLocation:
              "https://www.google.com/maps/place/The+University+of+Utah/@40.7446819,-111.8721514,13.74z/data=!4m14!1m7!3m6!1s0x87525feae84df31b:0xdd94fcd0de3a096e!2sThe+University+of+Utah!8m2!3d40.7649368!4d-111.8421021!16zL20vMDd3bGY!3m5!1s0x87525feae84df31b:0xdd94fcd0de3a096e!8m2!3d40.7649368!4d-111.8421021!16zL20vMDd3bGY",
            host: "Utah Athletics",
            id: "s2",
            location:
              "https://maps.apple.com/?address=201%20Presidents%20Cir,%20Salt%20Lake%20City,%20UT%2084112,%20United%20States&auid=12427399482959781058&ll=40.763341,-111.838911&lsp=9902&q=The%20University%20of%20Utah",
            logo: "../../images/Saltlakecity_Images/Company_Logos/Utah_Athletics.png",
            poster:
              "../../images/Saltlakecity_Images/Events/Utah_Athletics_Event.jpg",
          },
        ],
      },
    ],
    organizations: [
      {
        address: "301 S Temple, Salt Lake City, UT 84101",
        count: 0,
        description:
          "Vivint Arena home of the Jazz and many other events. Tonight: Jazz Vs Lakers!",
        googleLocation:
          "https://www.google.com/maps/place/Vivint+Arena/@40.7682681,-111.9032761,17z/data=!3m2!4b1!5s0x8752f500fc74f7a3:0x93ba42de0ffb9fd0!4m6!3m5!1s0x8752f50103ebf04d:0xf0e545531f11b120!8m2!3d40.7682681!4d-111.9010874!16zL20vMDM4Z2px",
        host: "Vivint Arena",
        id: "o1",
        location:
          "https://maps.apple.com/?address=301%20W%20South%20Temple,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=1388116280836244012&ll=40.768192,-111.901095&lsp=9902&q=Vivint%20Arena",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Vivint_Arena.png",
        poster:
          "../../images/Saltlakecity_Images/Events/Vivint_Arena_Event.jpg",
      },
    ],
    bars: [
      {
        count: 0,
        address: "69 E Gallivan Ave Salt Lake City, UT 84111 United States",
        description:
          "The most popular dance club in SLC for college students! Bring your dance moves if you want to bring someone home.",
        googleLocation:
          "https://www.google.com/maps/place/Good+Grammar/@40.7637607,-111.891306,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f50e31af15f3:0xe08fbd533bc1333c!8m2!3d40.7637567!4d-111.8891173!16s%2Fg%2F11ckqrr9p0",
        host: "Good Grammar",
        id: "b1",
        location:
          "https://maps.apple.com/?address=69%20E%20Gallivan%20Ave,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=1787506607907398949&ll=40.763800,-111.889223&lsp=9902&q=Good%20Grammar",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Good_Grammar_Logo.png",
        poster:
          "../../images/Saltlakecity_Images/Events/Good_Grammar_Event.jpg",
      },
      {
        address: "536 W 100 S, Salt Lake City, UT 84101",
        count: 0,
        description: "Complex!",
        googleLocation:
          "https://www.google.com/maps/place/The+Complex/@40.7676965,-111.9088113,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f4ffbb567fdd:0x59499009dab69b8c!8m2!3d40.7676925!4d-111.9066226!16s%2Fg%2F1jmcrq5pm",
        host: "The Complex",
        id: "b10",
        location:
          "https://maps.apple.com/?address=536%20W%20100%20S,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=4321887917538391411&ll=40.767388,-111.906471&lsp=9902&q=The%20Complex",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Complex.png",
        poster: "../../images/Saltlakecity_Images/Events/Complex_Event.jpg",
      },
      {
        address: "149 W 200 S, Salt Lake City, UT 84101",
        count: 0,
        description: "Soundwell",
        googleLocation:
          "https://www.google.com/maps/place/Soundwell/@40.764599,-111.8978491,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f5a3ce8e0bd1:0x97971f8eef4d75e4!8m2!3d40.764595!4d-111.8956604!16s%2Fg%2F11hdcgptmb",
        host: "Soundwell",
        id: "b11",
        location:
          "https://maps.apple.com/?address=149%20W%20200%20S,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=1421708462110004588&ll=40.764645,-111.895699&lsp=9902&q=Soundwell",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Soundwell.png",
        poster: "../../images/Saltlakecity_Images/Events/Soundwell_Event.jpg",
      },
      {
        address: "235 N 500 W, Salt Lake City, UT 84116",
        count: 0,
        description: "Union",
        googleLocation:
          "https://www.google.com/maps/place/The+Union+Event+Center/@40.7746207,-111.908572,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f453669e792d:0x19c0e87aafecca72!8m2!3d40.7746167!4d-111.9063833!16s%2Fg%2F11f3hm9_mk",
        host: "Union",
        id: "b12",
        location:
          "https://maps.apple.com/?address=235%20N%20500%20W,%20Salt%20Lake%20City,%20UT%20%2084116,%20United%20States&auid=17707644338627320693&ll=40.774472,-111.906374&lsp=9902&q=Union%20Event%20Center",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Union.png",
        poster: "../../images/Saltlakecity_Images/Events/Union_Event.jpg",
      },
      {
        address: "60 W Market St, Salt Lake City, UT 84101",
        count: 0,
        description:
          "New Yorker opens up at 2am. This is the after party. High Quality bar that is very popular.",
        googleLocation:
          "https://www.google.com/maps/place/New+Yorker+Social+Club/@40.7618809,-111.8950422,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f5a3a2a39e4f:0x86fbc27af6b64254!8m2!3d40.7618769!4d-111.8928535!16s%2Fg%2F11thlnr2pc",
        host: "New Yorker",
        id: "b13",
        location:
          "https://maps.apple.com/?address=60%20W%20Market%20St,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=10339981292433762894&ll=40.761876,-111.892864&lsp=9902&q=New%20Yorker%20Restaurant",
        logo: "../../images/Saltlakecity_Images/Company_Logos/New_Yorker.png",
        poster: "../../images/Saltlakecity_Images/Events/New_Yorker_Event.jpg",
      },
      {
        address: "366 S State St, Salt Lake City, UT 84111",
        count: 0,
        description:
          "Shades is new to the scene but definetely one of the most popular clubs in SLC. No cover fee and an large packed venue every weekend!",
        googleLocation:
          "https://www.google.com/maps/place/Shades+On+State/@40.7611783,-111.8906626,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f577609d0795:0x8178b85e138dbde3!8m2!3d40.7611743!4d-111.8884739!16s%2Fg%2F11mpf26nby",
        host: "Shades",
        id: "b2",
        location:
          "https://maps.apple.com/?address=366%20S%20State%20St,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=2750468757495027867&ll=40.761122,-111.888528&lsp=9902&q=Shades%20on%20State",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Shades.png",
        poster: "../../images/Saltlakecity_Images/Events/Shades_Event.jpg",
      },
      {
        address: "69 W 100 S, Salt Lake City, UT 84101",
        count: 0,
        description:
          "Silent Disco is the most fun youll ever have at a bar. Come to WhyKiki.",
        googleLocation:
          "https://www.google.com/maps/place/Why+KiKi/@40.7669169,-111.8956506,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f51c43cf9357:0xd384f3585f289430!8m2!3d40.7669129!4d-111.8934619!16s%2Fg%2F11qnt2p9hf",
        host: "Why Kiki",
        id: "b3",
        location:
          "https://maps.apple.com/?address=69%20W%20100%20S,%20Salt%20Lake%20City,%20UT%2084101,%20United%20States&auid=4706998083257741042&ll=40.766900,-111.893370&lsp=9902&q=Why%20Kiki",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Why_Kiki.png",
        poster: "../../images/Saltlakecity_Images/Events/Why_Kiki_Event.jpg",
      },
      {
        address: "149 Pierpont Ave, Salt Lake City, UT 84101",
        count: 0,
        description:
          "Salt Lake City's premier night club. We host the largest performers every weekend.",
        googleLocation:
          "https://www.google.com/maps/place/Sky+SLC/@40.763703,-111.8978918,17z/data=!3m2!4b1!5s0x8752f503b018084d:0x5456bc790778059f!4m6!3m5!1s0x8752f504fe784bb1:0xf5d34a840d1e4738!8m2!3d40.763699!4d-111.8957031!16s%2Fg%2F11b806mrcq",
        host: "Sky",
        id: "b4",
        location:
          "https://maps.apple.com/?address=149%20W%20Pierpont%20Ave,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=18114403355498355009&ll=40.763755,-111.895741&lsp=9902&q=Sky%20SLC",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Sky.png",
        poster: "../../images/Saltlakecity_Images/Events/Sky_Event.jpg",
      },
      {
        address: "32 Exchange Pl, Salt Lake City, UT 84111",
        count: 0,
        description:
          "If you're looking for a place to dance and the best food in SLC come to TWIST. No cover fee for girls.",
        googleLocation:
          "https://www.google.com/maps/place/Twist+Bar+-+Bistro+-+Social/@40.761319,-111.8923117,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f5104eeaee8d:0xd7096ff2a47248c0!8m2!3d40.761315!4d-111.890123!16s%2Fg%2F11b7rxhkfh",
        host: "Twist",
        id: "b5",
        location:
          "https://maps.apple.com/?address=32%20E%20Exchange%20Pl,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=12229257270440497455&ll=40.761184,-111.889884&lsp=9902&q=Twist",
        logo: "../../images/Saltlakecity_Images/Company_Logos/TWIST_CIRCLE_LOGO.png",
        poster: "../../images/Saltlakecity_Images/Events/Twist_Event.jpg",
      },
      {
        address: "6 N Rio Grande St Suite 35, Salt Lake City, UT 84101",
        count: 0,
        description:
          "Flankers is the best sports bar in Salt Lake City. Come here to watch sports, enjoy drinks and dance.",
        googleLocation:
          "https://www.google.com/maps/place/Flanker+Kitchen+%2B+Sporting+Club/@40.7696438,-111.905832,17z/data=!3m2!4b1!5s0x8752f50009f98351:0x7edf0a3ab55fb2ac!4m6!3m5!1s0x8752f56087342337:0xdf17b52e1eccac58!8m2!3d40.7696398!4d-111.9036433!16s%2Fg%2F11n_nt0vqb",
        host: "Flankers",
        id: "b6",
        location:
          "https://maps.apple.com/?address=6%20N%20Rio%20Grande%20St,%20Unit%2035,%20Salt%20Lake%20City,%20UT%2084101,%20United%20States&auid=10020824543625812321&ll=40.769905,-111.903749&lsp=9902&q=Flanker%20Kitchen%20And%20Sporting%20Club",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Flankers.png",
        poster: "../../images/Saltlakecity_Images/Events/Flankers_Event.jpg",
      },
      {
        address: "3360 S Redwood Rd, West Valley City, UT 84119",
        count: 0,
        description:
          "Bring your cowboy hat and boots. We have 3 bars inside, a karaoke room and a mechanical bull to ride!",
        googleLocation:
          "https://www.google.com/maps/place/Westerner+Club/@40.6992927,-111.9413976,17z/data=!3m1!4b1!4m6!3m5!1s0x87528b6f5a8c64bd:0x14fff8f085abfd35!8m2!3d40.6992887!4d-111.9392089!16s%2Fg%2F11b6ydbqsh",
        host: "The Westerner Club",
        id: "b7",
        location:
          "https://maps.apple.com/?address=3360%20S%20Redwood%20Rd,%20Salt%20Lake%20City,%20UT%2084119,%20United%20States&auid=7834022815141107560&ll=40.699231,-111.939487&lsp=9902&q=The%20Westerner",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Westener.png",
        poster: "../../images/Saltlakecity_Images/Events/Westener_Event.jpg",
      },
      {
        address: "465 S 700 E, Salt Lake City, UT 84102",
        count: 0,
        description:
          "Doesn't get any dirtier than this! Cheap drinks and fun enviorment full of college students! ",
        googleLocation:
          "https://www.google.com/maps/place/Ex-Wifes+Place/@40.7590822,-111.8728787,17z/data=!3m1!4b1!4m6!3m5!1s0x8752f5685b1cd607:0x637a0b30f0fa5e7e!8m2!3d40.7590782!4d-111.87069!16s%2Fg%2F1wz535mq",
        host: "X-Wife's Place",
        id: "b8",
        location:
          "https://maps.apple.com/?address=465%20S%20700%20E,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=15191187971162285327&ll=40.759017,-111.870653&lsp=9902&q=X-Wife's%20Place",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Ex_Wives.png",
        poster: "../../images/Saltlakecity_Images/Events/Ex_Wives_Event.jpg",
      },
      {
        address: "13 N 400 W, Salt Lake City, UT 84101",
        count: 0,
        description: "The Depot",
        googleLocation:
          "https://www.google.com/maps/place/The+Depot/@40.7696652,-111.9052225,17z/data=!3m2!4b1!5s0x8752f5001298efe9:0x7edf0a3a8ea55f60!4m6!3m5!1s0x8752f5006fab2b2f:0x26dfa5b7909acee1!8m2!3d40.7696612!4d-111.9030338!16s%2Fm%2F09gjjm6",
        host: "The Depot",
        id: "b9",
        location:
          "https://maps.apple.com/?address=13%20N%20400%20W,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=278286580270686650&ll=40.769691,-111.903079&lsp=9902&q=The%20Depot",
        logo: "../../images/Saltlakecity_Images/Company_Logos/Depot.png",
        poster: "../../images/Saltlakecity_Images/Events/Depot_Event.jpg",
      },
    ],
  },
  {
    city: "Albuquerque",
    id: "c2",
    universities: [
      {
        university: "University of New Mexico",
        logo: "../../images/Albuquerque_Images/New_Mexico_Logo.png",
        id: "u1",
        fraternities: [],
        schoolOrganizations: [],
      },
    ],
    organizations: [],
    bars: [
      {
        address: "",
        count: 0,
        description:
          "The most popular club in Albuquerque for college students! Bring your dance moves if you want to bring someone home.",
        googleLocation: "",
        host: "Canvas Artistry",
        id: "b1",
        location:
          "https://maps.apple.com/?address=69%20E%20Gallivan%20Ave,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=1787506607907398949&ll=40.763800,-111.889223&lsp=9902&q=Good%20Grammar",
        logo: "../../images/Albuquerque_Images/Canvas_Bar.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Founders Bar!",
        googleLocation: "",
        host: "Founders",
        id: "b10",
        location:
          "https://maps.apple.com/?address=536%20W%20100%20S,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=4321887917538391411&ll=40.767388,-111.906471&lsp=9902&q=The%20Complex",
        logo: "../../images/Albuquerque_Images/Founders_Bar.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Historic El Rey Theatre.",
        googleLocation: "",
        host: "El Rey Theatre",
        id: "b11",
        location:
          "https://maps.apple.com/?address=149%20W%20200%20S,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=1421708462110004588&ll=40.764645,-111.895699&lsp=9902&q=Soundwell",
        logo: "../../images/Albuquerque_Images/El_Rey_Theatre.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Anodyne Bar",
        googleLocation: "",
        host: "Anodyne",
        id: "b12",
        location:
          "https://maps.apple.com/?address=235%20N%20500%20W,%20Salt%20Lake%20City,%20UT%20%2084116,%20United%20States&auid=17707644338627320693&ll=40.774472,-111.906374&lsp=9902&q=Union%20Event%20Center",
        logo: "../../images/Albuquerque_Images/Anodyne_Bar.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description:
          "Every thursday is ladies night. Bring your boots and cowboy hat!",
        googleLocation: "",
        host: "Dirty Bourbon",
        id: "b2",
        location:
          "https://maps.apple.com/?address=366%20S%20State%20St,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=2750468757495027867&ll=40.761122,-111.888528&lsp=9902&q=Shades%20on%20State",
        logo: "../../images/Albuquerque_Images/Dirty_Bourbon.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Classic Bar with pool tables and karaoke.",
        googleLocation: "",
        host: "Spectators",
        id: "b3",
        location:
          "https://maps.apple.com/?address=69%20W%20100%20S,%20Salt%20Lake%20City,%20UT%2084101,%20United%20States&auid=4706998083257741042&ll=40.766900,-111.893370&lsp=9902&q=Why%20Kiki",
        logo: "../../images/Albuquerque_Images/Spectators.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Really popular college bar.",
        googleLocation: "",
        host: "Monte Vista",
        id: "b4",
        location:
          "https://maps.apple.com/?address=149%20W%20Pierpont%20Ave,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=18114403355498355009&ll=40.763755,-111.895741&lsp=9902&q=Sky%20SLC",
        logo: "../../images/Albuquerque_Images/Monte_Vista.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Happy Acidents Bar.",
        googleLocation: "",
        host: "Happy Accients",
        id: "b5",
        location:
          "https://maps.apple.com/?address=32%20E%20Exchange%20Pl,%20Salt%20Lake%20City,%20UT%20%2084111,%20United%20States&auid=12229257270440497455&ll=40.761184,-111.889884&lsp=9902&q=Twist",
        logo: "../../images/Albuquerque_Images/Happy_Accidents.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Effex Night Club.",
        googleLocation: "",
        host: "Effex Night Club",
        id: "b6",
        location:
          "https://maps.apple.com/?address=6%20N%20Rio%20Grande%20St,%20Unit%2035,%20Salt%20Lake%20City,%20UT%2084101,%20United%20States&auid=10020824543625812321&ll=40.769905,-111.903749&lsp=9902&q=Flanker%20Kitchen%20And%20Sporting%20Club",
        logo: "../../images/Albuquerque_Images/Effex_Night_Club.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Bourbon And Boots!",
        googleLocation: "",
        host: "Bourbon And Boots",
        id: "b7",
        location:
          "https://maps.apple.com/?address=3360%20S%20Redwood%20Rd,%20Salt%20Lake%20City,%20UT%2084119,%20United%20States&auid=7834022815141107560&ll=40.699231,-111.939487&lsp=9902&q=The%20Westerner",
        logo: "../../images/Albuquerque_Images/Bourbon_And_Boots.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Classic New Mexico Brewery!",
        googleLocation: "",
        host: "Marble Brewery",
        id: "b8",
        location:
          "https://maps.apple.com/?address=465%20S%20700%20E,%20Salt%20Lake%20City,%20UT%20%2084102,%20United%20States&auid=15191187971162285327&ll=40.759017,-111.870653&lsp=9902&q=X-Wife's%20Place",
        logo: "../../images/Albuquerque_Images/Marble_Brewery.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "Bosque Brewing Co.",
        googleLocation: "",
        host: "Bosque Brewing Co",
        id: "b9",
        location:
          "https://maps.apple.com/?address=13%20N%20400%20W,%20Salt%20Lake%20City,%20UT%20%2084101,%20United%20States&auid=278286580270686650&ll=40.769691,-111.903079&lsp=9902&q=The%20Depot",
        logo: "../../images/Albuquerque_Images/Bosque_Brewing_Co.png",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
    ],
  },
  {
    city: "Princeton",
    id: "c3",
    universities: [
      {
        university: "Princeton University",
        logo: "../../images/Princeton_Images/Princeton_Logo.png",
        id: "u1",
        fraternities: [],
        schoolOrganizations: [],
      },
    ],
    organizations: [],
    bars: [
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "CANNON DIAL ELM CLUB",
        id: "b1",
        location:
          "https://maps.apple.com/?address=Princeton%20University,%2021%20Prospect%20Ave,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=4998727721991551424&ll=40.347803,-74.653371&lsp=9902&q=Cannon%20Dial%20Elm%20Club",
        logo: "../../images/Princeton_Images/Cannon_Dial_Elm.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "TIGER INN",
        id: "b10",
        location:
          "https://maps.apple.com/?address=48%20Prospect%20St,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=16219817937410564748&ll=40.348956,-74.652255&lsp=9902&q=Tiger%20Inn",
        logo: "../../images/Princeton_Images/TIger_Inn.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "TOWER CLUB",
        id: "b11",
        location:
          "https://maps.apple.com/?address=13%20Prospect%20Ave,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=5154098180209454217&ll=40.347664,-74.653907&lsp=9902&q=Princeton%20Tower%20Club",
        logo: "../../images/Princeton_Images/Tower_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description:
          "The street doesnt hold events very often but when we do you don't want to miss out.",
        googleLocation: "",
        host: "The Street",
        id: "b12",
        location:
          "https://maps.apple.com/?ll=40.348524,-74.652383&q=Dropped%20Pin",
        logo: "../../images/Princeton_Images/The_Street.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "CAP AND GOWN CLUB",
        id: "b2",
        location:
          "https://maps.apple.com/?address=61%20Prospect%20Avenue,%20Princeton,%20NJ%2008540,%20United%20States&auid=6496369184967722629&ll=40.348359,-74.651075&lsp=9902&q=The%20Cap%20and%20Gown%20Club",
        logo: "../../images/Princeton_Images/Cap_And_Gown.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "CHARTER CLUB",
        id: "b3",
        location:
          "https://maps.apple.com/?address=79%20Prospect%20St,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=13612280289759311516&ll=40.348769,-74.650031&lsp=9902&q=Charter%20Club",
        logo: "../../images/Princeton_Images/Charter_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "CLOISTER INN",
        id: "b4",
        location:
          "https://maps.apple.com/?address=65%20Prospect%20Avenue,%20Princeton,%20NJ%2008540,%20United%20States&auid=16930379670435117806&ll=40.348609,-74.650565&lsp=9902&q=Cloister%20Inn",
        logo: "../../images/Princeton_Images/Cloister_Inn.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "COLONIAL CLUB",
        id: "b5",
        location:
          "https://maps.apple.com/?address=40%20Prospect%20Ave,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=7401241528859756216&ll=40.348850,-74.652845&lsp=9902&q=Colonial%20Clubzazq",
        logo: "../../images/Princeton_Images/Colonial_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "COTTAGE CLUB",
        id: "b6",
        location:
          "https://maps.apple.com/?address=51%20Prospect%20St,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=13561089463416835424&ll=40.348314,-74.651732&lsp=9902&q=Cottage%20Club",
        logo: "../../images/Princeton_Images/Cottage_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "IVY CLUB",
        id: "b7",
        location:
          "https://maps.apple.com/?address=43%20Prospect%20Ave,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=14140059258758764635&ll=40.348073,-74.652248&lsp=9902&q=The%20Ivy%20Club",
        logo: "../../images/Princeton_Images/Ivy_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "QUADRANGLE CLUB",
        id: "b8",
        location:
          "https://maps.apple.com/?address=33%20Prospect%20Ave,%20Princeton,%20NJ%20%2008540,%20United%20States&auid=5428653301490619978&ll=40.348068,-74.652799&lsp=9902&q=Quadrangle%20Club",
        logo: "../../images/Princeton_Images/QuadRangle_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
      {
        address: "",
        count: 0,
        description: "This weekend is the annual foamcoming. (PID Required)",
        googleLocation: "",
        host: "TERRACE CLUB",
        id: "b9",
        location:
          "https://maps.apple.com/?address=62%20Washington%20Rd,%20Princeton,%20NJ%2008540,%20United%20States&auid=16006066150404713156&ll=40.347105,-74.653926&lsp=9902&q=Terrace%20Club",
        logo: "../../images/Princeton_Images/Terrace_Club.PNG",
        poster: "../../images/Saltlakecity_Images/Events/",
      },
    ],
  },
];

function DataProvider(props) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dataState, setDataState] = useState(DUMMY_DATA);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const didMount = useDidMount();

  useEffect(() => {
    if (!dataFetched && user) {
      setVenueCount(dataState);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      if (currentUser) {
        await fetch(`${process.env.REACT_APP_backendUrl}/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
          body: JSON.stringify({
            id: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            let userProfile = { ...data.user };
            setUserProfile(userProfile);
            setUser(currentUser);
            setIsAuthChecked(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        if (location.pathname === "/") {
          navigate("/home", true);
        }
      } else {
        setIsAuthChecked(true);
        setUser(null);
        setUserProfile(null);
        if (
          location.pathname !== "/privacy" &&
          location.pathname !== "/contact"
        ) {
          navigate("/", true);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div></div>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", true);
  };

  const setVenueCount = async (currentDataState) => {
    try {
      const eventsResponse = await fetch(
        `${process.env.REACT_APP_backendUrl}/api/events/today`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const response = await eventsResponse.json();
      if (response || response?.message === "Events fetched successfully") {
        const matchingEvents = response.events;

        const updatedDataState = currentDataState.map((cityData) => {
          const universities = cityData.universities.map((university) => {
            const fraternities = university.fraternities.map((fraternity) => {
              const matchingEvent = matchingEvents.find(
                (event) => event.venueName === fraternity.host
              );

              return matchingEvent
                ? { ...fraternity, ...matchingEvent }
                : fraternity;
            });

            const schoolOrganizations = university.schoolOrganizations.map(
              (organization) => {
                const matchingEvent = matchingEvents.find(
                  (event) => event.venueName === organization.host
                );

                return matchingEvent
                  ? { ...organization, ...matchingEvent }
                  : organization;
              }
            );

            return { ...university, fraternities, schoolOrganizations };
          });

          const organizations = cityData.organizations.map((organization) => {
            const matchingEvent = matchingEvents.find(
              (event) => event.venueName === organization.host
            );

            return matchingEvent
              ? { ...organization, ...matchingEvent }
              : organization;
          });

          const bars = cityData.bars.map((bar) => {
            const matchingEvent = matchingEvents.find(
              (event) => event.venueName === bar.host
            );

            return matchingEvent ? { ...bar, ...matchingEvent } : bar;
          });

          return { ...cityData, universities, organizations, bars };
        });

        const responseData = await fetch(
          `${process.env.REACT_APP_backendUrl}/api/cities/attachCountToVenue`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              currentDataState: updatedDataState,
            }),
          }
        );
        const finalData = await responseData.json();
        setDataState(finalData);
        setDataFetched(true);
      } else {
        const responseData = await fetch(
          `${process.env.REACT_APP_backendUrl}/api/cities/attachCountToVenue`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              currentDataState: currentDataState,
            }),
          }
        );
        const finalData = await responseData.json();
        setDataState(finalData);
        setDataFetched(true);
      }
    } catch (err) {}
  };

  const dataContext = {
    user: user,
    setUser: setUser,
    userProfile: userProfile,
    setUserProfile: setUserProfile,
    handleLogout: handleLogout,
    isAuthChecked: isAuthChecked,
    dataFetched: dataFetched,
    setDataFetched: setDataFetched,
    dataState: dataState,
    setDataState: setDataState,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
