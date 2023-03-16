<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit0bd150d774f2cacbac6c7664b2172af1
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Router\\' => 7,
        ),
        'C' => 
        array (
            'Config\\' => 7,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Router\\' => 
        array (
            0 => __DIR__ . '/../..' . '/routes',
        ),
        'Config\\' => 
        array (
            0 => __DIR__ . '/../..' . '/config',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit0bd150d774f2cacbac6c7664b2172af1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit0bd150d774f2cacbac6c7664b2172af1::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit0bd150d774f2cacbac6c7664b2172af1::$classMap;

        }, null, ClassLoader::class);
    }
}
