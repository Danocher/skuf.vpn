export default function CabinetButton() {
    return (
        <button onClick={() => {window.location.href = '/profile'}} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm lg:text-base">
                   Личный кабинет
        </button>
    );
}