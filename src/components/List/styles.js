import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    formRow: {
        display: 'flex',
        justifyContent: 'space-between', // Forms appear side by side
        gap: theme.spacing(2), // Adds spacing between forms
        marginBottom: '30px'
    },
    formControl: {
        flex: 1, // Equal width for both forms
        minWidth: 200, // Prevents shrinking
    },
    // formControl: {
    //   margin: theme.spacing(1), minWidth:200, marginBottom: '30px', width: '100%'
    // },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    loading: {
      height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    // container: {
    //     margin: theme.spacing(2),
    //     padding: theme.spacing(2),
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: theme.spacing(2),
    // },
    marginBottom: {
      marginBottom: '30px',
    },
    list: {
      height: '75vh', overflow: 'auto',
    },
  }));