import React, { useState } from 'react';
import Navigation from '../components/Navigation'; // Import the Navigation 
import styles from '../departmentPage.css';

const DepartmentPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = {
    department1: {
      title: 'Department 1',
      content: (
        <>
          <center> <h2>Assessing</h2></center>
          <p>
            <center>
              <h3>  MARCH BOARD OF REVIEW </h3>
              Public Appeal Hearings - Click Here for Information
              •In-person appeal at Williamston City Hall, 161 E. Grand River Ave., Williamston, MI 48895, is available BY APPOINTMENT ONLY.  Please call 517-919-1566 or email assessor@williamston-mi.us to schedule an in-person appointment during the dates and times listed below.
              •Written appeals are being accepted in lieu of a personal appearance and must be received no later than March 16, 2023 by 5:00 p.m.  Written appeals must provide Form 618/L-4035. Call (517) 919-1566 or email assessor@williamston-mi.us for assistance obtaining necessary forms. Appeals in writing are to be mailed to: Attn. City Assessor, PO Box 118, Laingsburg, MI 48848.
            </center>
          </p>
        </>
      ),
    },
    department2: {
      title: 'Department 2',
      content: (
        <>
          <center>
            <h2>City Manager </h2>
            <p>John Hanifan has served Michigan communities for more than 25 years.  He grew up in Durand, Michigan, is a graduate of Michigan State University and a proud Spartan.  He is passionate about our State and is fascinated by small towns.  Mr. Hanifan has successfully completed more than $100 million in public works and infrastructure projects.  He is an expert negotiator having settled dozens of labor contracts in his career. He has also served as an Executive Director for Downtown Development Authorities (DDAs) for nearly 18 years.  Mr. Hanifan has coached basketball and football for nearly 25 years and is an avid curler.  He and his wife Dana have three adult children.</p>
          </center>
        </>
      ),
    },
    department3: {
      title: 'Department 3',
      content: (
        <>
          <center>
            <h2>City Staff</h2>

            <p>City Manager:
              John Hanifan, 517-655-2774, ext. 110
            </p>
            <p>
              City Clerk:
              Holly Thompson, 517-655-2774, ext. 102
            </p>
            <p>
              Deputy City Clerk:
              Barb Burke, 517-655-2774, ext. 104
            </p>
            <p>
              City Treasurer:
              Tom Mead, 517-655-2774, ext. 103
            </p>
            <p>
              Deputy City Treasurer/Utility Billing Clerk:
              Ann Casper, 517-655-2774, ext. 101
            </p>
            <p>
              Police Chief:
              Jeff Weiss, 517-655-7222, ext. 203
            </p>
            <p>
              Police Support Specialist/Executive Administrative Assistant:
              Yvonne (Vonnie) Green, 517-655-4222, ext. 201
            </p>
            <p>
              Assessor:
              Pete Preston, 517-655-2448
            </p>
            <p>
              Waste Water Treatment Plant:
              Stephen David, 517-655-2774
            </p>
            <p>
              Zoning Administrator:
              Community Development, 517-655-2774, ext. 105
            </p>
          </center>

        </>
      ),
    },
    department4: {
      title: 'Department 4',
      content: (
        <>
          <center>
            <h2>Clerk</h2>
            <p>
              <b>Holly Thompson</b> MMC, CMMC, was appointed as Clerk of the City of Williamston in 2009, but has served as Assistant, Deputy and Acting Clerk since 2000.  She has been a member of the Michigan Association of Municipal Clerks (MAMC) and International Institute of Municipal Clerks since 2001.  In June 2018, Holly received the City Clerk of the Year Award at the annual conference of the MAMC.  In addition to her work, she is the Director Conference Chair for the Michigan Association of Municipal Clerks, Past President & Treasurer of the Capitol Area Municipal Clerks Association, and Past-President of the Williamston Area Chamber of Commerce.  She has received her Master Municipal Clerk (MMC) designation as well as being a Certified Michigan Municipal Clerk (CMMC).  In her spare time she enjoys spending time with her husband at their property in Mesick, spoiling their dogs, baking cupcakes, and volunteering by running fundraisers for the Ingham County Animal Shelter every year.  Through her volunteerism she has earned three Humanitarian Awards, and a Community Impact Award.

              cityclerk@williamston-mi.us.</p>
          </center>
        </>
      ),
    },
    department5: {
      title: 'Department 5',
      content: (
        <>
          <center>
            <h2>Department of Public Works </h2>
            <p>•LIMB AND BRANCH PICKUP
              Collection dates are the 1st and 3rd Tuesdays from April through November. This is done by the City's Department of Public Works at no additional cost to residents.
              <p>
                This is for fallen branches or minor tree trimming done by the property owner.  The City will not collect brush or branches from trees that have been removed by a tree removal service.
                Place brush piles, no greater than 4 feet high, neatly at the curb with all the cut ends in the same direction, preferably with the ends facing away from the direction of traffic.
                This is for large branches and limbs over 4 feet in length. The main branch stem should have a minimum diameter of 1 inch and not be greater than 6 inches.  (For the safety of employees, very small branches or sticks will not be collected.
                Brush contaminated with dirt, vines, stumps, stones or metal cannot be chipped and will not be collected.
              </p>
              <p>
                •LEAF PICKUP
                Leaf pickup is in the Fall only (no leaf pickup in the Spring).  Do not bag your leaves. Any changes to the dates on the calendar will be on the City website and on the City’s Facebook page.  If you live on Grand River Avenue, do not put them in the street, only rake to the curb.  All other areas, if the leaves are not in the street, they will not be picked up.
              </p>
              <p>
                •HYDRANT FLUSHING DATES
                There will be hydrant flushing throughout the City of Williamston in spring/summer months.  Hydrant flushing is done during the day.  Please be sure your water is running clear before you do laundry (especially light colors or whites). Hydrant flushing is done to ensure the water system is functioning properly and can handle fighting a fire.
              </p>
              <p>
                •ICE AND SNOW REMOVAL
                It is the responsibility of the property owner to remove any ice and snow from the entire length of the sidewalk on their property whether the property is unoccupied or if there is a building or structure on it.  Sidewalks need to be cleared within 24 hours of cessation of snowfall if less than 4" or within 48 hours if greater than 4". Sidewalks not cleared may be cleaned by the City and the property owner will be invoiced. Per City Ordinance 50-32.
              </p>
              <p>
                •LONG GRASS
                All lawns/grass areas including vacant lots are to be kept mowed. Grass & weeds over 12 inches will result in a letter from the City with a 10 day notice to mow. If not mowed, City personnel will mow the grass and the property owner will be invoiced.  Per City ordinance 26-73.
              </p>

            </p>
          </center>
        </>
      ),
    },
    department6: {
      title: 'Department 6',
      content: (
        <>
          <center>
            <h2>Finance/ Treasurer</h2>
            <p>Tom Mead, City Treasurer, 517-655-2774, ext. 103, treasurer@williamston-mi.us </p>


            <p>Tom’s municipal experience includes having served as a deputy treasurer for 11 years before working an additional 11 years in the role of finance director/treasurer.  Tom is a long-time member of the Michigan Municipal Treasurer’s Association, Michigan Governmental Finance Officers Association, the National Governmental Finance Officers Association, and the Association of Public Treasurers, United States & Canada.  All of which provide invaluable municipal treasurer education opportunities.  Prior to municipal government, Tom spent over 8 years in commercial banking, and 5 years in auditing, governmental consulting, and private sector accounting.  Tom graduated from Fort Lewis College in Durango, Colorado (“The Campus in the Sky” as it is often referred to) with a major in accounting and a minor in business administration.  Tom and his wife Laurie have 3 adult children.  Tom enjoys spending time with his grandchildren, working on his small farm, and relaxing in Michigan’s Upper Peninsula.

            </p>
          </center>
        </>
      ),
    },
    department7: {
      title: 'Department 7',
      content: (
        <>
          <h2>Planning and Zoning</h2>
          <p>Zoning Administrator:
            Community Development
            517-655-2774, ext. 105, or press 6</p>
        </>
      ),
    },
    department8: {
      title: 'Department 8',
      content: (
        <>
          <center>
            <h2>Police Departments</h2>
            <p>•IF YOU NEED TO SPEAK WITH AN OFFICER ABOUT A NON-EMERGENCY SITUATION OR FILE A REPORT, please contact the Williamston Police Department at 517-655-4222 during regular business hours (Mon-Fri, 8am-5pm).  If you reach our voicemail, please leave a message at extension 201 and someone will return your call as quickly as possible.
              <p>
                •HIGHER EDUCATION AFTER INCARCERATION
                Click this link for more information - ​https://www.intelligent.com/education-and-career-guide-after-incarceration/
              </p>
              <p>
                •PISTOL REGISTRATIONS - Pistol registrations can be placed in the drop box at City Hall.  Please make sure you keep the purchaser copy.  We need the licensing authority copy.  It may also say MSP copy or Registry copy.
              </p>
              <p>
                •TRAFFIC CRASH REPORTS - If you need a copy of your crash report that occurred in the City, please go to the LexisNexis website:  https://policereports.lexisnexis.com/.  For customer assistance with LexisNexis call 1-866-215-2771.
              </p>
              <p>
                •FREEDOM OF INFORMATION ACT REQUESTS - Please click here for a fillable form.
              </p>
              <p>
                •BUSINESS CONTACT INFORMATION - Please click here for a fillable form on which to complete business contact information.
              </p>
              <p>
                •PROPERTY CHECK - The Williamston Police Department will check your property/residence while you are away for any length of time.  Please complete the form below if you would like your residence checked while you are away.  You can fax the form to 517-655-6498 or mail it to Williamston Police Department, 161 E. Grand River Ave., Williamston, MI  48895.  Click here for a fillable Property Check Form.
              </p>
              <p>
                •WILLIAMSTON POLICE DEPARTMENT DRUGS DROP OFF - The Williamston Police Department is participating in the Capital Area Take Back Meds/Drugs Drop Off program.  You will need to call the Police Department to set an appointment time to drop them off - 517-655-4222.  City Hall is not able to accept your medications.  You can also take your medications to a pharmacy.  For more information about what can be dropped off, click here.
              </p>
              <p>
                •PARKING ON CITY STREETS - There is NO PARKING on any City street from October 1 – March 31 between 2am-5am.  This ordinance is in effect even if there is no snow on the ground, per City Ordinance - Sec. 66-145.  If there is a late snowfall (in April) cars will need to be off the streets.  This is to allow our DPW workers the ability to remove snow from streets.
              </p>

              •RESIDENTS - Smart911 IS AVAILABLE IN INGHAM COUNTY!

              Click this Smart911 link or go to Smart911.com and build your profile today!  Give 9-1-1 the information they need to help you fast.  Sign up today!  </p>
          </center>
        </>
      ),
    },
    department9: {
      title: 'Department 9',
      content: (
        <>
          <center>
            <h2>Water and Sewer</h2>
            <p>SEWER - what NOT to flush
              Disinfectant wipes, personal wipes, baby wipes, paper towels, and other similar materials should not be flushed down toilets.  Personal wipes are especially misleading because they are often labeled "flushable", but they can clog sewer pipes and lead to blockages in the pumps that are part of the City sewer systems. In recent weeks, we have observed a surge of wipes in the sewer system, which can cause pump blockages and a greater potential for backups. The photo to the right shows the damage these wipes can do to the system.

              Waste treatment systems are designed to handle human waste and toilet paper only.  Please take your responsibility seriously.  Wipes and other items cause problems in the pipes inside your home. Clogged pipes can lead to overflowing toilets, basement sewer backups, and the need to clean out the main drain. Thank you for your help in spreading the word!



              CITIZENS GUIDE WATER BILL
              Click here for the Citizens Guide Water Bill which offers general information on your water/sewer bill.

              NOTICE TO CITY OF WILLIAMSTON WATER SUPPLY CUSTOMERS
              Results from PFAS testing by State of Michigan - The results show that of the PFOA and PFOS compounds tested, the chemicals were not detected in the City's water supply; therefore, levels are below the EPA's LHA level.</p>
          </center>
        </>
      ),
    },
  };

  const displayDepartmentContent = (departmentKey) => {
    setSelectedDepartment(departmentKey);
  };

  return (
    <div className="DepartmentPage">
      <Navigation />
      <header>
        <h1>Department</h1>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department1')}>
                Assessing
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department2')}>
                City Manager
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department3')}>
                City Staff
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department4')}>
                Clerk
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department5')}>
                Public Works
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department6')}>
                Finance/Treasurer
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department7')}>
                Planning and Zoning
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department8')}>
                Police
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department9')}>
                Water and Sewer
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content">
        {/* Content from the selected department will be displayed here */}
        {selectedDepartment && departments[selectedDepartment].content}
      </main>
    </div>
  )
}

export default DepartmentPage;
