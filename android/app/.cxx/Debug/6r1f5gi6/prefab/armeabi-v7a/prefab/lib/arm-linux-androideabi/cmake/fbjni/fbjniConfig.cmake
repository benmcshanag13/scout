if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/benmcshanag/.gradle/caches/8.10.2/transforms/e958dec8f2b266c4799db7857ab7facc/transformed/jetified-fbjni-0.7.0/prefab/modules/fbjni/libs/android.armeabi-v7a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/benmcshanag/.gradle/caches/8.10.2/transforms/e958dec8f2b266c4799db7857ab7facc/transformed/jetified-fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

