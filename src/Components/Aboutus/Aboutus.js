import React from "react";
import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <>
      {/* section down where it should come */}
      <section
        className="navbar_sect"
        style={{ backgroundImage: "url(/images/bg6.jpg)" }}
      >
        <div className="contact_sect">
          <div className="container-fluid">
            <div className="inner_container">
              <h1>ABOUT US</h1>
              <p>
                <Link to="/home">Home</Link>&ensp;/&ensp;Contact Us
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="container-fluid">
          <div className="row m-0 p20">
            {/* <!---- Column Left ------> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h3>Our Values</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis,et quasi architecto beatae vitae dicta
                sunt explicabo.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis,et quasi architecto beatae vitae dicta
                sunt explicabo.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis,et quasi architecto beatae vitae dicta
                sunt explicabo.
              </p>
            </div>
            {/* <!----//-------> */}

            {/* <!---- Column Right ------> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <img className="img-fluid" src="/images/about.jpg" alt="source" />
            </div>
            {/* <!-----/ /------------>		 */}
          </div>

          {/* <div className="our-story">
            <h2>Our Story</h2>
            <div className="wrap">
              Widget
              <div className="inner-wrap">
                <h4>Foreign Followers</h4>
                <p className="counter" data-target="88000">
                  0
                </p>
              </div>
              <div className="inner-wrap">
                <h4>Certfied Institutions</h4>
                <p className="counter" data-target="96">
                  0
                </p>
              </div>
              <div className="inner-wrap">
                <h4>Students Enrolled</h4>
                <p className="counter" data-target="4789">
                  0
                </p>
              </div>
              <div className="inner-wrap">
                <h4>Complete Courses</h4>
                <p className="counter" data-target="488">
                  0
                </p>
              </div>
            </div>
          </div> */}
          {/* <script>
					const counters = document.querySelectorAll('.counter');
					const speed = 500;
					
					counters.forEach(counter => {
							 const updateCount = () => {
									const target = +counter.getAttribute('data-target');
									const count = +counter.innerText;
									
									const inc = target / speed;
									
									if(count < target) {
										counter.innerText = Math.ceil(count + inc);
										setTimeout(updateCount, 1); 
									} else {
										count.innerText = target;	
									}
								}
								
								updateCount();
					});
				  </script> */}

          {/* <!------/ /-------> */}

          <div className="row m-0 p20">
            {/* <!---- Column Left ------> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h1>Who We Are</h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis,et quasi architecto beatae vitae dicta
                sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam,voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia,consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.,Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, adipisci velit, sed quia non numquam
                eius modi tempora
              </p>
            </div>
            {/* <!------/ /-------> */}

            {/* <!---- Column Right ------> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h1>What We Do</h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis,et quasi architecto beatae vitae dicta
                sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam,voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia,consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.,Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, adipisci velit, sed quia non numquam
                eius modi tempora
              </p>
            </div>
            {/* <!------/ /-------> */}
          </div>
          {/* <!------/ /-------> */}
        </div>
      </section>
    </>
  );
};
export default Aboutus;
