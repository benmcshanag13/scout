if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/benmcshanag/.gradle/caches/transforms-4/559260f47f7b9d326948bc98d2ac0510/transformed/jetified-hermes-android-0.75.4-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/benmcshanag/.gradle/caches/transforms-4/559260f47f7b9d326948bc98d2ac0510/transformed/jetified-hermes-android-0.75.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

