 export default class SideNav {
    openLeftPart() {
        $(".open-btn").click(function () {
            $(this).addClass("d-none")
            $('.close-btn').removeClass("d-none")
            $('.sideNav').animate({ left: 0 }, 500)

        })

    }
    closeLeftPart() {
        $(".close-btn").click(function () {
            $(this).addClass("d-none")
            $('.open-btn').removeClass("d-none")
            $('.sideNav').animate({ left: -leftSideWidth }, 500)

        })
    }
}    