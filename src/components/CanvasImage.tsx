'use client';

import React from 'react';
import DiscoveryCanvas from './canvas/DiscoveryCanvas';
import ArchitectureCanvas from './canvas/ArchitectureCanvas';
import ValidationCanvas from './canvas/ValidationCanvas';
import DeploymentCanvas from './canvas/DeploymentCanvas';

export type AnimationType =
    | 'discovery-design'
    | 'architecture-build'
    | 'validation-optimization'
    | 'deployment-operations';

interface CanvasImageProps {
    type?: AnimationType;
    alt?: string;
    active?: boolean;
    className?: string;
}

export default function CanvasImage({
    type = 'discovery-design',
    alt = '',
    active = false,
    className = '',
}: CanvasImageProps) {
    switch (type) {
        case 'discovery-design':
            return <DiscoveryCanvas active={active} alt={alt} className={className} />;
        case 'architecture-build':
            return <ArchitectureCanvas active={active} alt={alt} className={className} />;
        case 'validation-optimization':
            return <ValidationCanvas active={active} alt={alt} className={className} />;
        case 'deployment-operations':
            return <DeploymentCanvas active={active} alt={alt} className={className} />;
        default:
            return <DiscoveryCanvas active={active} alt={alt} className={className} />;
    }
}