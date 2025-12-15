if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/benmcshanag/.gradle/caches/transforms-4/f3e021c231d274b198d55171c37c6a04/transformed/jetified-hermes-android-0.76.6-release/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/benmcshanag/.gradle/caches/transforms-4/f3e021c231d274b198d55171c37c6a04/transformed/jetified-hermes-android-0.76.6-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

