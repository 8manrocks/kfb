import { Paper } from "@mui/material";

const ContactUs = () => {
  return (
    <>
       <Paper sx={{ minHeight: 1, padding: 2 }}>
            <h1 className="title text-color">contact us</h1>
            <h2 className="tag text-color">
              M/s Kanchan Foods & Beverages
            </h2>
            <h3 className="tag text-color">
             Address: <span>Survey No. 569/1, Plot No. A/2, Mouza Bhidi, Tal. Deoli, Wardha. (MH.)-442101.</span>
            </h3>
            <h3 className="tag text-color">
             Email: info.kanchanfoods@gmail.com
            </h3>
            <h3 className="tag text-color">
             Customer Care No: 7768949668
            </h3>
          </Paper>
    </>
  );
};

export default ContactUs
