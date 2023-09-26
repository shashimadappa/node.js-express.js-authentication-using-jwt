// Message codes for Settings - 135XXX
const settingsCodes = {
    codes: {
        'BAD_REQUEST': "135000",
        'SET_SAVE_SUCCESS': "135101",
        'SET_SAVE_ERROR': "135102",
        'SET_FETCH_SUCCESS': "135103",
        'SET_FETCH_ERROR': "135104",
        'SET_DELETE_SUCCESS': "135105",
        'SET_DELETE_ERROR': "135106",
        'SET_UPDATE_SUCCESS': "135107",
        'SET_UPDATE_ERROR': "135108",
        'SET_DUPLICATE_YES': "135109",
        'SET_DUPLICATE_NO': "135110",
        'SET_NO_DATA_FOUND': "135111"
    },
    message: {
        'BAD_REQUEST': 'Bad request',
        'SET_SAVE_SUCCESS': '# saved successfully',
        'SET_SAVE_ERROR': 'Error occured while saving #',
        'SET_FETCH_SUCCESS': 'Data fetching successfully',
        'SET_FETCH_ERROR': 'Error occured while fetching data',
        'SET_DELETE_SUCCESS': '# status updated successfully',
        'SET_DELETE_ERROR': 'Error occured while updating status of #',
        'SET_UPDATE_SUCCESS': '# updates successfully',
        'SET_UPDATE_ERROR': 'Error occured while updating #',
        'SET_DUPLICATE_YES': '# already exist',
        'SET_DUPLICATE_NO': '# not exist',
        'SET_NO_DATA_FOUND': 'No data found'
    }
};

module.exports = settingsCodes;