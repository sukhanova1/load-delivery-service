//routes
export const LOGIN_ROUTE = '/auth/login';
export const REGISTER_ROUTE = '/auth/register';
export const FORGOT_PASS_ROUTE = '/auth/forgot-password';
export const PROFILE_ROUTE = '/home/profile';
export const TRUCKS_ROUTE = '/home/my-trucks';
export const LOADS_ROUTE = '/home/my-loads';
//images
export const LOGO_SRC = '/assets/logo.jpg';
export const LOGO_ALT_VALUE = 'company logo';
export const USER_PHOTO_SRC = '/assets/user-photo.png';
export const USER_PHOTO_ALT_VALUE = 'user';
export const MENU_BURGER_SRC = '/assets/icons/menu-burger-icon.png';
export const MENU_BURGER_ALT_VALUE = 'menu icon';
export const PROFILE_SRC = '/assets/icons/profile-icon.png';
export const PROFILE_ALT_VALUE = 'profile icon';
export const TRUCKS_SRC = '/assets/icons/truck-icon.png';
export const TRUCKS_ALT_VALUE = 'truck icon';
export const LOAD_SRC = '/assets/icons/load-icon.png';
export const LOAD_ALT_VALUE = 'load icon';
export const LOGOUT_SRC = '/assets/icons/logout-icon.png';
export const LOGOUT_ALT_VALUE = 'logout icon';
export const CHECK_MARK_SRC = '/assets/check-mark.png';
export const CHECK_MARK_ALT_VALUE = 'check mark icon';
export const ERROR_ICON_SRC = '/assets/icons/error-icon.png';
export const ERROR_ICON_ALT_VALUE = 'error icon';
export const SPRINTER_SRC = '/assets/icons/sprinter-icon.png';
export const SMALL_STRAIGHT_SRC = '/assets/icons/small-straight-icon.png';
export const LARGE_STRAIGHT_SRC = '/assets/icons/large-straight-icon.png';
export const DOUBLE_TICK_SRC = '/assets/icons/double-tick-icon.png';
export const DOUBLE_TICK_ALT_VALUE = 'double tick icon';
export const EDIT_ICON_SRC = '/assets/icons/edit-icon.png';
export const EDIT_ICON_ALT_VALUE = 'edit icon';
export const DELETE_ICON_SRC = '/assets/icons/delete-icon.png';
export const DELETE_ICON_ALT_VALUE = 'delete icon';
export const DIMENSIONS_ICON_SRC = '/assets/icons/dimensions-icon.png';
export const DIMENSIONS_ICON_ALT_VALUE = 'dimensions icon';
export const DESTINATION_ICON_SRC = '/assets/icons/destination-icon.png';
export const DESTINATION_ICON_ALT_VALUE = 'destination icon';
export const BACK_ICON_SRC = '/assets/icons/back-icon.png';
export const BACK_ICON_ALT_VALUE = 'back icon';
export const CLOSE_ICON_SRC = '/assets/icons/close-icon.png';
export const CLOSE_ICON_ALT_VALUE = 'close icon';
//inputs
export const INPUT_TEXT = 'text';
export const INPUT_NUMBER = 'number';
export const INPUT_NAME = 'name';
export const INPUT_NAME_PLACEHOLDER = 'Enter your name';
export const INPUT_EMAIL = 'email';
export const INPUT_EMAIL_PLACEHOLDER = 'Enter your email';
export const INPUT_PASS = 'password';
export const INPUT_PASS_PLACEHOLDER = 'Enter your password';
export const INPUT_CONFIRM_PASS = 'confirm password';
export const INPUT_CONFIRM_PASS_PLACEHOLDER = 'Confirm your password';
export const INPUT_NEW_PASS = 'new password';
export const INPUT_NEW_PASS_PLACEHOLDER = 'Enter new password';
export const INPUT_RADIO = 'radio';
export const INPUT_RADIO_NAME = 'role';
export const INPUT_LOAD_NAME_PLACEHOLDER = 'Enter load name';
export const INPUT_PICKUP_ADDR = 'pickup-address';
export const INPUT_PICKUP_ADDR_PLACEHOLDER = 'Enter pick-up address';
export const INPUT_DEL_ADDR = 'delivery-address';
export const INPUT_DEL_ADDR_PLACEHOLDER = 'Enter delivery address';
export const INPUT_PAYLOAD = 'payload';
export const INPUT_LENGTH = 'length';
export const INPUT_WIDTH = 'width';
export const INPUT_HEIGHT = 'height';
//select
export const SELECT_ID_ADD_TRUCK = 'add-truck-select';
export const SELECT_ID_EDIT_TRUCK = 'edit-truck-select';
export const SPRINTER_TYPE = 'SPRINTER';
export const SMALL_STRAIGHT_TYPE = 'SMALL STRAIGHT';
export const LARGE_STRAIGHT_TYPE = 'LARGE STRAIGHT';
export const SELECT_TRUCK_DEFAULT_VALUE = 'TRUCK TYPE';
export const SELECT_TRUCK_OPTIONS = [
	SPRINTER_TYPE,
	SMALL_STRAIGHT_TYPE,
	LARGE_STRAIGHT_TYPE,
];
export const SELECT_ID_LOAD_STATUS = 'load-status-select';
export const LOAD_STATUS_NEW = 'NEW';
export const LOAD_STATUS_ASSIGNED = 'ASSIGNED';
export const LOAD_STATUS_SHIPPED = 'SHIPPED';
export const SELECT_LOAD_DEFAULT_VALUE = 'SORT LOADS';
export const SELECT_ALL_LOADS = 'ALL LOADS';
export const SELECT_LOAD_OPTIONS = [
	SELECT_ALL_LOADS,
	LOAD_STATUS_NEW,
	LOAD_STATUS_ASSIGNED,
	LOAD_STATUS_SHIPPED,
];
//buttons
export const BUTTON_TYPE_BUTTON = 'button';
export const BUTTON_TYPE_SUBMIT = 'submit';

export const BUTTON_TEXT_LOGIN = 'Login';
export const BUTTON_TEXT_SIGNUP = 'Sign up';
export const BUTTON_TEXT_SEND = 'Send';
export const BUTTON_TEXT_DELETE_ACC = 'Delete Account';
export const BUTTON_TEXT_CHANGE_PASS = 'Change Password';
export const BUTTON_TEXT_LOGOUT = 'Logout';
export const BUTTON_TEXT_ADD = 'Add';
export const BUTTON_TEXT_ASSIGN = 'Assign';
export const BUTTON_TEXT_OK = 'OK';
export const BUTTON_TEXT_FINISH_DEL = 'Finish Delivery';
export const BUTTON_TEXT_POST = 'POST';
export const BUTTON_TEXT_ADD_LOAD = 'ADD NEW LOAD';
export const BUTTON_TEXT_UPDATE = 'Update';
export const BUTTON_TEXT_CHANGE = 'Change';
export const BUTTON_TEXT_CANCEL = 'Cancel';
export const BUTTON_TEXT_DELETE = 'Delete';
//title
export const TITLE_PROFILE = 'Profile';
export const TITLE_TRUCKS = 'My Trucks';
export const TITLE_LOADS = 'My Loads';
export const TITLE_LOGOUT = 'Logout';
// modal types
export const MODAL_TYPE_ERROR = 'error';
export const MODAL_TYPE_SUCCESS = 'success';

export const BASE_URL = 'http://localhost:8080/api';

export const DRIVER_ROLE = 'DRIVER';
export const SHIPPER_ROLE = 'SHIPPER';

export const TRUCK_STATUS_IS = 'IS';
export const TRUCK_STATUS_OL = 'OL';
