if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/benmcshanag/.gradle/caches/transforms-4/7d75899a6f4619581cbe83fc43000f12/transformed/jetified-hermes-android-0.76.6-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/benmcshanag/.gradle/caches/transforms-4/7d75899a6f4619581cbe83fc43000f12/transformed/jetified-hermes-android-0.76.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

